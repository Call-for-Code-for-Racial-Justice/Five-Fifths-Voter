#!/usr/bin/env python3
"""Validate a Five Fifths candidate scorecard YAML.

Usage:
    python tools/validate_scorecard.py <scorecard.yaml> [--race "<race name from the input>"]

Prints OK and exits 0 when the file is valid. Otherwise prints one error per line
and exits 1. The issue taxonomy is read from the skill file so there is a single
source of truth: .claude/skills/scorecard/SKILL.md
"""
import argparse
import datetime as dt
import re
import sys
from pathlib import Path

import yaml

SKILL_PATH = Path(__file__).resolve().parent.parent / ".claude" / "skills" / "scorecard" / "SKILL.md"

TOP_KEYS = [
    "fiveFifthsId", "name", "state", "race_id", "race", "party", "primary",
    "office_sought", "district", "region", "incumbent", "debate_participant",
    "ballot_order", "avatar_initials", "issues", "sections",
]
ISSUES_KEYS = ["clarity", "sources_count", "sources_list", "last_updated", "callout", "data_note", "links"]
ISSUES_OPTIONAL = {"data_note"}
ITEM_KEYS = ["topic", "note", "coverage", "position_tag", "position_type", "source"]
POSITION_TYPES = {"pos", "mixed", "none"}
BOTH = "Addresses both directions"
NO_POSITION_PHRASE = "No position found in reviewed sources"
MIN_SOURCES = 3

STATES = {
    "AL": "Alabama", "AK": "Alaska", "AZ": "Arizona", "AR": "Arkansas", "CA": "California",
    "CO": "Colorado", "CT": "Connecticut", "DE": "Delaware", "DC": "District of Columbia",
    "FL": "Florida", "GA": "Georgia", "HI": "Hawaii", "ID": "Idaho", "IL": "Illinois",
    "IN": "Indiana", "IA": "Iowa", "KS": "Kansas", "KY": "Kentucky", "LA": "Louisiana",
    "ME": "Maine", "MD": "Maryland", "MA": "Massachusetts", "MI": "Michigan", "MN": "Minnesota",
    "MS": "Mississippi", "MO": "Missouri", "MT": "Montana", "NE": "Nebraska", "NV": "Nevada",
    "NH": "New Hampshire", "NJ": "New Jersey", "NM": "New Mexico", "NY": "New York",
    "NC": "North Carolina", "ND": "North Dakota", "OH": "Ohio", "OK": "Oklahoma", "OR": "Oregon",
    "PA": "Pennsylvania", "RI": "Rhode Island", "SC": "South Carolina", "SD": "South Dakota",
    "TN": "Tennessee", "TX": "Texas", "UT": "Utah", "VT": "Vermont", "VA": "Virginia",
    "WA": "Washington", "WV": "West Virginia", "WI": "Wisconsin", "WY": "Wyoming",
}


class UniqueKeyLoader(yaml.SafeLoader):
    """SafeLoader that rejects duplicate mapping keys instead of silently overriding."""


def _construct_mapping(loader, node, deep=False):
    seen = set()
    for key_node, _ in node.value:
        key = loader.construct_object(key_node, deep=deep)
        if key in seen:
            raise yaml.constructor.ConstructorError(
                None, None, f"duplicate key: {key!r}", key_node.start_mark
            )
        seen.add(key)
    return yaml.SafeLoader.construct_mapping(loader, node, deep)


UniqueKeyLoader.add_constructor(yaml.resolver.BaseResolver.DEFAULT_MAPPING_TAG, _construct_mapping)


def slugify(title: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", title.lower().replace("&", " ")).strip("-")


def load_taxonomy():
    """Parse sections, topics, and allowed tags from the ISSUE TAXONOMY in SKILL.md.

    Returns a list of (section_id, section_title, [(topic, [tags])]).
    """
    text = SKILL_PATH.read_text(encoding="utf-8")
    start = text.index("## ISSUE TAXONOMY")
    end = text.index("### Coverage scale")
    sections = []
    for line in text[start:end].splitlines():
        if line.startswith("### "):
            title = line[4:].strip()
            sections.append((slugify(title), title, []))
        elif line.startswith("|") and sections:
            cells = [c.strip() for c in line.strip().strip("|").split("|")]
            if len(cells) != 2 or cells[0] == "Topic" or set(cells[0]) <= {"-", " "}:
                continue
            sections[-1][2].append((cells[0], [t.strip() for t in cells[1].split("·")]))
    topic_count = sum(len(s[2]) for s in sections)
    if len(sections) != 4 or topic_count != 15:
        raise RuntimeError(
            f"Taxonomy parse problem in {SKILL_PATH}: {len(sections)} sections, {topic_count} topics"
        )
    return sections


def is_int(value):
    return isinstance(value, int) and not isinstance(value, bool)


def check_keys(errors, where, mapping, expected, optional=()):
    if not isinstance(mapping, dict):
        errors.append(f"{where}: must be a mapping")
        return False
    present = list(mapping.keys())
    required = [k for k in expected if k not in optional]
    missing = [k for k in required if k not in present]
    extra = [k for k in present if k not in expected]
    if missing:
        errors.append(f"{where}: missing field(s): {', '.join(missing)}")
    if extra:
        errors.append(f"{where}: unexpected field(s): {', '.join(map(str, extra))}")
    if not missing and not extra:
        order = [k for k in expected if k in present]
        if present != order:
            errors.append(f"{where}: fields out of order. Expected: {', '.join(order)}")
    return not missing


def validate_top(errors, doc, race_input):
    if not check_keys(errors, "top level", doc, TOP_KEYS):
        return
    fid = doc["fiveFifthsId"]
    if not isinstance(fid, str) or not re.fullmatch(r"[a-z0-9]+(-[a-z0-9]+)+", fid):
        errors.append(f"fiveFifthsId: must be lowercase <first>-<last>, got {fid!r}")
    for key in ("name", "party", "region"):
        if not isinstance(doc[key], str) or not doc[key].strip():
            errors.append(f"{key}: must be a non-empty string")

    state = doc["state"]
    if state not in STATES:
        errors.append(f"state: must be a 2-letter US state code, got {state!r}")
        state = None

    race, office, race_id = doc["race"], doc["office_sought"], doc["race_id"]
    if race != office:
        errors.append(f"race and office_sought must be identical, got {race!r} and {office!r}")
    year = None
    if not isinstance(race, str) or not re.search(r"\b(19|20)\d{2}$", race):
        errors.append(f"race: must end with a 4-digit year, got {race!r}")
    else:
        year = race[-4:]
        if state and not race.startswith(STATES[state] + " "):
            errors.append(f"race: must start with the state name {STATES[state]!r}, got {race!r}")
    if not isinstance(race_id, str) or not re.fullmatch(r"[a-z]{2}-[a-z0-9]+(-[a-z0-9]+)*-(19|20)\d{2}", race_id):
        errors.append(f"race_id: must look like ga-senate-2026, got {race_id!r}")
    else:
        if state and not race_id.startswith(state.lower() + "-"):
            errors.append(f"race_id: must start with {state.lower()}-, got {race_id!r}")
        if year and not race_id.endswith("-" + year):
            errors.append(f"race_id: year must match race year {year}, got {race_id!r}")

    primary = doc["primary"]
    if primary is not None and (not isinstance(primary, str) or not primary.strip()):
        errors.append(f"primary: must be null or a non-empty string, got {primary!r}")
    race_names = [race] if isinstance(race, str) else []
    if race_input:
        race_names.append(race_input)
    mentions_primary = any(re.search(r"\bprimary\b", r, re.I) for r in race_names)
    if mentions_primary and primary is None:
        errors.append("primary: race name contains 'primary' so primary must not be null")
    if not mentions_primary and primary is not None:
        errors.append("primary: race name does not contain 'primary' so primary must be null")

    district = doc["district"]
    if district is not None and not (isinstance(district, str) and re.fullmatch(r"District \d+", district)):
        errors.append(f"district: must be null or 'District N', got {district!r}")
    for key in ("incumbent", "debate_participant"):
        if not isinstance(doc[key], bool):
            errors.append(f"{key}: must be true or false, got {doc[key]!r}")
    if not is_int(doc["ballot_order"]) or doc["ballot_order"] < 1:
        errors.append(f"ballot_order: must be an integer >= 1, got {doc['ballot_order']!r}")
    initials = doc["avatar_initials"]
    if not (isinstance(initials, str) and re.fullmatch(r"[A-Z]{2}", initials)):
        errors.append(f"avatar_initials: must be 2 uppercase letters, got {initials!r}")


def validate_issues(errors, doc):
    issues = doc.get("issues")
    if not check_keys(errors, "issues", issues, ISSUES_KEYS, ISSUES_OPTIONAL):
        return 0
    for key in ("clarity", "callout"):
        if not isinstance(issues[key], str) or not issues[key].strip():
            errors.append(f"issues.{key}: must be a non-empty string")
    sources_list, links = issues["sources_list"], issues["links"]
    if not isinstance(sources_list, list) or not all(isinstance(s, str) and s.strip() for s in sources_list):
        errors.append("issues.sources_list: must be a list of non-empty strings")
        sources_list = []
    if not isinstance(links, list):
        errors.append("issues.links: must be a list")
        links = []
    for i, link in enumerate(links):
        if not check_keys(errors, f"issues.links[{i}]", link, ["label", "url"]):
            continue
        if not isinstance(link["label"], str) or not link["label"].strip():
            errors.append(f"issues.links[{i}].label: must be a non-empty string")
        if not (isinstance(link["url"], str) and re.match(r"https?://\S+$", link["url"])):
            errors.append(f"issues.links[{i}].url: must be an http(s) URL, got {link['url']!r}")
    urls = [l.get("url") for l in links if isinstance(l, dict)]
    if len(set(urls)) != len(urls):
        errors.append("issues.links: duplicate URLs")
    if not is_int(issues["sources_count"]):
        errors.append("issues.sources_count: must be an integer")
    elif not (issues["sources_count"] == len(sources_list) == len(links)):
        errors.append(
            f"issues: sources_count ({issues['sources_count']}), sources_list ({len(sources_list)}) "
            f"and links ({len(links)}) must all match"
        )
    if len(links) < MIN_SOURCES:
        errors.append(f"issues.links: need at least {MIN_SOURCES} sources, found {len(links)}")
    updated = issues["last_updated"]
    try:
        # PyYAML parses bare YYYY-MM-DD as a date, quoted as a string. Accept both.
        if isinstance(updated, dt.date):
            pass
        else:
            dt.date.fromisoformat(updated)
    except (TypeError, ValueError):
        errors.append(f"issues.last_updated: must be YYYY-MM-DD, got {updated!r}")
    if "data_note" in issues:
        note = issues["data_note"]
        if not isinstance(note, str) or not note.strip():
            errors.append("issues.data_note: remove it if empty, otherwise it must be a non-empty string")
        elif re.search(r"ballot[_ ]order", note, re.I):
            errors.append("issues.data_note: must not mention ballot_order")
    return len(links)


def validate_sections(errors, doc, taxonomy, link_count):
    sections = doc.get("sections")
    if not isinstance(sections, list):
        errors.append("sections: must be a list")
        return
    if len(sections) != len(taxonomy):
        errors.append(f"sections: expected {len(taxonomy)} sections, found {len(sections)}")
    for si, (sid, title, topics) in enumerate(taxonomy):
        if si >= len(sections):
            break
        section = sections[si]
        where = f"sections[{si}] ({sid})"
        if not check_keys(errors, where, section, ["id", "title", "items"]):
            continue
        if section["id"] != sid:
            errors.append(f"{where}: id must be {sid!r}, got {section['id']!r}")
        if section["title"] != title:
            errors.append(f"{where}: title must be {title!r}, got {section['title']!r}")
        items = section["items"]
        if not isinstance(items, list) or len(items) != len(topics):
            errors.append(f"{where}: expected {len(topics)} items")
            continue
        for ii, (topic, tags) in enumerate(topics):
            validate_item(errors, f"{where}.{topic}", items[ii], topic, tags, link_count)


def validate_item(errors, where, item, topic, tags, link_count):
    if not check_keys(errors, where, item, ITEM_KEYS):
        return
    if item["topic"] != topic:
        errors.append(f"{where}: topic must be {topic!r} in this position, got {item['topic']!r}")
    note, coverage = item["note"], item["coverage"]
    tag, ptype, source = item["position_tag"], item["position_type"], item["source"]
    if not isinstance(note, str) or not note.strip():
        errors.append(f"{where}: note must be a non-empty string")
        note = ""
    if not is_int(coverage) or not 0 <= coverage <= 3:
        errors.append(f"{where}: coverage must be an integer 0-3, got {coverage!r}")
        return
    if ptype not in POSITION_TYPES:
        errors.append(f"{where}: position_type must be pos, mixed, or none, got {ptype!r}")
        return
    if tag is not None and tag not in tags:
        errors.append(f"{where}: position_tag {tag!r} is not allowed. Allowed: {' | '.join(tags)}")

    if coverage == 0:
        if tag is not None or ptype != "none" or source is not None:
            errors.append(f"{where}: coverage 0 requires position_tag null, position_type none, source null")
        if NO_POSITION_PHRASE not in note:
            errors.append(f"{where}: coverage 0 note must include '{NO_POSITION_PHRASE}.'")
    if ptype == "none":
        if tag is not None:
            errors.append(f"{where}: position_type none requires position_tag null")
        if source is not None:
            errors.append(f"{where}: position_type none requires source null")
    else:
        if coverage == 0:
            errors.append(f"{where}: a position cannot have coverage 0")
        if tag is None:
            errors.append(f"{where}: position_type {ptype} requires a position_tag")
        if ptype == "mixed" and tag != BOTH:
            errors.append(f"{where}: position_type mixed requires the tag {BOTH!r}")
        if ptype == "pos" and tag == BOTH:
            errors.append(f"{where}: the tag {BOTH!r} requires position_type mixed")
        if not (isinstance(source, list) and source and all(is_int(s) for s in source)):
            errors.append(f"{where}: source must be a non-empty array of link indexes, got {source!r}")
        else:
            bad = [s for s in source if not 0 <= s < link_count]
            if bad:
                errors.append(f"{where}: source index {bad} outside links (0-{link_count - 1})")
            if len(set(source)) != len(source):
                errors.append(f"{where}: source has duplicate indexes")


def main():
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("path")
    parser.add_argument("--race", help="race name exactly as given in the input, used for the primary check")
    args = parser.parse_args()

    try:
        doc = yaml.load(Path(args.path).read_text(encoding="utf-8"), Loader=UniqueKeyLoader)
    except (OSError, yaml.YAMLError) as exc:
        print(f"ERROR: cannot read YAML: {exc}")
        return 1
    if not isinstance(doc, dict):
        print("ERROR: YAML top level must be a mapping")
        return 1

    errors = []
    taxonomy = load_taxonomy()
    validate_top(errors, doc, args.race)
    link_count = validate_issues(errors, doc)
    validate_sections(errors, doc, taxonomy, link_count)

    if errors:
        print(f"{len(errors)} error(s) in {args.path}:")
        for e in errors:
            print(f"ERROR: {e}")
        return 1
    print("OK")
    return 0


if __name__ == "__main__":
    sys.exit(main())
