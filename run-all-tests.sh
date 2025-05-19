#!/bin/bash
# Run all test scripts in the tests directory
set -e

TEST_DIR="$(dirname "$0")/tests"

for testfile in "$TEST_DIR"/*.test.js; do
  echo "Running $testfile..."
  node "$testfile"
done
