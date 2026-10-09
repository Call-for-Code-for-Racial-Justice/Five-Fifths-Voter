#!/usr/bin/env bash
# Generate scorecards for every candidate in a CSV by running the scorecard skill
# headlessly with `claude -p`, one candidate at a time.
#
# Usage:
#   ./run_batch.sh [candidates.csv]
#
# CSV columns (header row required, no commas or quotes inside fields):
#   candidate,state,race,party,incumbent,debate_participant
# incumbent and debate_participant may be left empty for the agent to research.
#
# Environment variables:
#   DRY_RUN=1     print the commands instead of running them
#   FORCE=1       re-run candidates that already have a successful log
#   MAX_TURNS=80  turn limit per candidate
#   MODEL=...     pass --model to claude (default: your claude default)

set -uo pipefail
cd "$(dirname "$0")"

CSV="${1:-candidates.csv}"
MAX_TURNS="${MAX_TURNS:-80}"
LOG_DIR="logs"
mkdir -p "$LOG_DIR" out work

if [[ ! -f "$CSV" ]]; then
  echo "CSV not found: $CSV" >&2
  exit 2
fi

# Use the project's virtualenv so `python` has youtube_transcript_api and pyyaml.
if [[ -f .venv/bin/activate ]]; then
  # shellcheck disable=SC1091
  source .venv/bin/activate
fi

ALLOWED_TOOLS="WebSearch,WebFetch,Read,Write,Skill,Bash(python tools/get_transcript.py:*),Bash(python tools/validate_scorecard.py:*),Bash(date:*)"

slugify() {
  echo "$1" | tr '[:upper:]' '[:lower:]' | tr ' ' '-' | tr -cd 'a-z0-9-'
}

# Read the CSV, skipping the header row. The last read handles a missing final newline.
tail -n +2 "$CSV" | while true; do
  IFS=',' read -r candidate state race party incumbent debate || [[ -n "${candidate:-}" ]] || break
  [[ -z "${candidate// }" ]] && continue
  candidate="${candidate%$'\r'}"; debate="${debate%$'\r'}"

  slug="$(slugify "$candidate")"
  log="$LOG_DIR/$slug.json"

  if [[ -z "${FORCE:-}" && -f "$log" ]] && python3 -c "import json,sys; sys.exit(1 if json.load(open('$log')).get('is_error') else 0)" 2>/dev/null; then
    echo "SKIP  $candidate (already has a successful log; FORCE=1 to re-run)"
    continue
  fi

  prompt="Use the scorecard skill to research this candidate and write their scorecard.

Candidate: $candidate
State: $state
Race: $race
Party: $party"
  [[ -n "$incumbent" ]] && prompt+="
Incumbent: $incumbent"
  [[ -n "$debate" ]] && prompt+="
Debate participant: $debate"

  cmd=(claude -p "$prompt"
       --allowedTools "$ALLOWED_TOOLS"
       --permission-mode acceptEdits
       --max-turns "$MAX_TURNS"
       --output-format json)
  [[ -n "${MODEL:-}" ]] && cmd+=(--model "$MODEL")

  if [[ -n "${DRY_RUN:-}" ]]; then
    echo "DRY   would run claude -p for $candidate with this prompt:"
    printf '%s\n' "$prompt" | sed 's/^/        /'
    continue
  fi

  echo "RUN   $candidate ($race)"
  # </dev/null keeps claude from swallowing the rest of the CSV from stdin.
  if "${cmd[@]}" > "$log" 2> "$LOG_DIR/$slug.err" < /dev/null; then
    python3 - "$log" "$candidate" <<'PY'
import json, sys
path, name = sys.argv[1], sys.argv[2]
try:
    data = json.load(open(path))
except Exception as exc:
    print(f"FAIL  {name}: could not parse {path}: {exc}")
    sys.exit(0)
status = "FAIL" if data.get("is_error") else "DONE"
cost = data.get("total_cost_usd")
cost_text = f" (${cost:.2f}, {data.get('num_turns')} turns)" if cost is not None else ""
print(f"{status}  {name}{cost_text}")
print("      " + str(data.get("result", "")).strip().replace("\n", "\n      ")[:600])
PY
  else
    echo "FAIL  $candidate: claude exited with an error, see $LOG_DIR/$slug.err"
  fi
done

echo
echo "Finished. Scorecards are in out/, per-run logs in $LOG_DIR/."
echo "Look for any out/*/*.FAILED.md files, and read each *.sources.md before publishing."
