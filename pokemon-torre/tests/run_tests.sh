#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
cc -std=c11 -Wall -Wextra -Werror tests/test_progress.c -o /tmp/emerald_tower_progress_test
/tmp/emerald_tower_progress_test
python tests/generate_host_harness.py >/dev/null
cc -std=c11 -Wall -Wextra -Werror -Wno-unused-function -Wno-pointer-to-int-cast -Itests/stub tests/test_tower_engine.c -o /tmp/emerald_tower_engine_test
/tmp/emerald_tower_engine_test
python tests/test_installer.py
