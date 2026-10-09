#!/usr/bin/env python3
"""Print a YouTube transcript as timestamped plain text.

Usage: python tools/get_transcript.py <youtube-url-or-video-id> [--out FILE]

With --out, the transcript is written to FILE (parent folders are created) and only
a one-line summary is printed. Exits with code 1 and a message on stderr if no
transcript is available.
"""
import argparse
import re
import sys
from pathlib import Path
from urllib.parse import parse_qs, urlparse

from youtube_transcript_api import YouTubeTranscriptApi

ID_RE = re.compile(r"[A-Za-z0-9_-]{11}")


def extract_video_id(value: str) -> str:
    value = value.strip()
    if ID_RE.fullmatch(value):
        return value
    url = urlparse(value)
    host = (url.hostname or "").removeprefix("www.")
    if host == "youtu.be":
        candidate = url.path.lstrip("/")[:11]
        if ID_RE.fullmatch(candidate):
            return candidate
    if host in ("youtube.com", "m.youtube.com"):
        if url.path == "/watch":
            candidate = parse_qs(url.query).get("v", [""])[0]
            if ID_RE.fullmatch(candidate):
                return candidate
        match = re.match(r"^/(?:embed|shorts|live)/([A-Za-z0-9_-]{11})", url.path)
        if match:
            return match.group(1)
    raise ValueError(f"Could not find a YouTube video ID in: {value}")


def fmt(seconds: float) -> str:
    s = int(seconds)
    return f"{s // 3600:02d}:{s % 3600 // 60:02d}:{s % 60:02d}"


def main() -> int:
    parser = argparse.ArgumentParser(description="Print a YouTube transcript as text.")
    parser.add_argument("video")
    parser.add_argument("--out", help="write the transcript to this file instead of stdout")
    args = parser.parse_args()
    try:
        video_id = extract_video_id(args.video)
        transcript = YouTubeTranscriptApi().fetch(video_id, languages=["en"])
    except Exception as exc:  # the library raises several distinct error types
        print(f"TRANSCRIPT_UNAVAILABLE: {type(exc).__name__}: {exc}", file=sys.stderr)
        return 1
    lines = [f"# YouTube video {video_id}"]
    for snippet in transcript:
        text = " ".join(snippet.text.split())
        lines.append(f"[{fmt(snippet.start)}] {text}")
    output = "\n".join(lines) + "\n"
    if args.out:
        path = Path(args.out)
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(output, encoding="utf-8")
        print(f"Saved {len(lines) - 1} transcript lines for video {video_id} to {path}")
    else:
        print(output, end="")
    return 0


if __name__ == "__main__":
    sys.exit(main())
