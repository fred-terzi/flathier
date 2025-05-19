#!/bin/bash
# Run all test scripts in the tests directory and print a summary at the end
set -e

TEST_DIR="$(dirname "$0")"
PASS_COUNT=0
FAIL_COUNT=0
TOTAL=0

for testfile in "$TEST_DIR"/*.test.js; do
  echo "Running $testfile..."
  if node "$testfile"; then
    PASS_COUNT=$((PASS_COUNT+1))
  else
    FAIL_COUNT=$((FAIL_COUNT+1))
  fi
  TOTAL=$((TOTAL+1))
  echo
done

echo "====================="
echo "Test Summary:"
echo "Passed: $PASS_COUNT/$TOTAL"
echo "Failed: $FAIL_COUNT/$TOTAL"
echo "====================="
