#!/bin/bash
# Public bootstrap only. Private documentation is downloaded with GitHub auth.
set -euo pipefail

main() {
  [[ "$(uname -s)" == Darwin ]] || { echo 'Incept Course Builder currently supports macOS only.' >&2; exit 1; }
  umask 077
  if ( : </dev/tty ) 2>/dev/null; then tty_available=1; fi
  local root="${INCEPT_BUILDER_HOME:-$HOME/.local/share/incept-course-builder}"
  local temp gh_bin python_bin uv_bin archive checksum commit tty_available=0
  mkdir -p "$root/runtime/bin"
  export PATH="$root/runtime/bin:$HOME/.local/bin:$PATH"
  temp=$(mktemp -d)
  trap "rm -rf -- $(printf '%q' "$temp")" EXIT
  printf '\n  ╭─────╮ ╭─────╮\n  │  ▰  │ │  ▰  │   INCEPT\n  │     ╰─╯     │   Course Builder\n  ╰──────┬──────╯\n\n  Your course factory. On your Mac.\n\n'

  verify() {
    local actual
    actual=$(shasum -a 256 "$1"); actual=${actual%% *}
    [[ "$actual" == "$2" ]] || { echo 'Download checksum failed. Nothing executed.' >&2; exit 1; }
  }

  printf '  [1/4] Checking your Mac\n'
  if command -v gh >/dev/null 2>&1; then
    gh_bin=$(command -v gh); printf '    ✓ GitHub CLI already installed\n'
  else
    case "$(uname -m)" in
      arm64) archive=gh_2.100.0_macOS_arm64.zip; checksum=45f9a62da2f6e641a7fad57e2ce39656dfd7ef331372d80a2a2aed65abb01642 ;;
      x86_64) archive=gh_2.100.0_macOS_amd64.zip; checksum=fcd7799e85eb575f3c7d2b1679bfbfedaefa1269d4bc7d096b51e10939b4812b ;;
      *) echo 'Unsupported Mac architecture.' >&2; exit 1 ;;
    esac
    printf '    → Installing GitHub CLI locally\n'
    curl -fsSL "https://github.com/cli/cli/releases/download/v2.100.0/$archive" -o "$temp/gh.zip"
    verify "$temp/gh.zip" "$checksum"
    unzip -q "$temp/gh.zip" -d "$temp/gh"
    gh_bin=$(find "$temp/gh" -type f -path '*/bin/gh' -print -quit)
    [[ -n "$gh_bin" ]] || { echo 'GitHub CLI archive is incomplete.' >&2; exit 1; }
    cp "$gh_bin" "$root/runtime/bin/gh"; chmod 700 "$root/runtime/bin/gh"
    gh_bin="$root/runtime/bin/gh"
  fi
  if command -v python3 >/dev/null 2>&1 && python3 -c 'import sys; sys.exit(sys.version_info < (3,11))' 2>/dev/null; then
    python_bin=$(command -v python3); printf '    ✓ Python already installed\n'
  else
    printf '    → Installing a private Python runtime\n'
    if ! command -v uv >/dev/null 2>&1; then
      curl -fsSL https://github.com/astral-sh/uv/releases/download/0.12.11/uv-installer.sh -o "$temp/uv.sh"
      verify "$temp/uv.sh" 2c0d7ff0e15a458f46c20bf4d0b1c617f642f578d03f76bc535c9359014cff29
      UV_INSTALL_DIR="$root/runtime/bin" UV_NO_MODIFY_PATH=1 sh "$temp/uv.sh"
    fi
    uv_bin=$(command -v uv)
    export UV_PYTHON_INSTALL_DIR="$root/runtime/python"
    "$uv_bin" python install 3.11
    python_bin=$("$uv_bin" python find --managed-python 3.11)
  fi

  printf '\n  [2/4] Connecting your Alpha GitHub account\n'
  if ! "$gh_bin" auth status --hostname github.com >/dev/null 2>&1; then
    [[ "$tty_available" == 1 ]] || { echo 'Sign into GitHub CLI in a terminal, then run this command again.' >&2; exit 1; }
    "$gh_bin" auth login --hostname github.com --web --git-protocol https </dev/tty
  fi
  if ! commit=$("$gh_bin" api repos/InceptTrilogy/ap-four-course-dashboard/commits/main --jq .sha); then
    printf '\n  Your GitHub account needs access to InceptTrilogy/ap-four-course-dashboard.\n  Sign in with your authorized Alpha account, then rerun the installer.\n' >&2; exit 1
  fi
  [[ "$commit" =~ ^[0-9a-f]{40}$ ]] || { echo 'Invalid release identity.' >&2; exit 1; }
  printf '    ✓ Private repository accessible\n\n  [3/4] Installing your local dashboard\n'
  "$gh_bin" api -H 'Accept: application/vnd.github.raw+json' "repos/InceptTrilogy/ap-four-course-dashboard/contents/install.py?ref=$commit" > "$temp/install.py"
  if [[ "$tty_available" == 1 ]]; then
    "$python_bin" -B "$temp/install.py" --root "$root" --commit "$commit" "$@" </dev/tty
  else
    "$python_bin" -B "$temp/install.py" --root "$root" --commit "$commit" "$@"
  fi
}
main "$@"
