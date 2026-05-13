#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SOURCE_DIR="${ROOT_DIR}/public/images"

QUALITY="${WEBP_QUALITY:-82}"
EFFORT="${WEBP_EFFORT:-6}"

log() { echo "$@"; }

is_up_to_date() {
  # usage: is_up_to_date <dst> <src>
  [[ -f "$1" && "$1" -nt "$2" ]]
}

convert_one() {
  # usage: convert_one <src>
  local src="$1"
  local dst="${src%.*}.webp"
  local out_dir
  out_dir="$(dirname "${src}")"

  if is_up_to_date "${dst}" "${src}"; then
    return 1 # not converted (used only for counting)
  fi

  pnpm sharp -i "${src}" -o "${out_dir}" -f webp -q "${QUALITY}" --effort "${EFFORT}" >/dev/null

  local relative_src="${src#"${ROOT_DIR}/"}"
  local relative_dst="${dst#"${ROOT_DIR}/"}"
  log "Converted: ${relative_src} -> ${relative_dst}"
  return 0
}

if [[ ! -d "${SOURCE_DIR}" ]]; then
  log "Skipped: image directory is not found at ${SOURCE_DIR}"
  exit 0
fi

converted=0

while IFS= read -r -d '' src; do
  if convert_one "${src}"; then
    converted=$((converted + 1))
  fi
done < <(
  find "${SOURCE_DIR}" -type f \( -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.png' \) -print0
)

log "WebP conversion is completed. Converted files: ${converted}"
