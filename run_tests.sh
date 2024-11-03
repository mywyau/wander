#!/bin/bash

# Description: This script runs Jest tests located in the src/tests/__tests__ directory.

# Ensure the script is executed from the project root
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT_DIR" || exit

# Determine if a specific test file was passed as an argument
if [ -n "$1" ]; then
  TEST_FILE="$1"
  echo "Running a single test: $TEST_FILE"
else
  TEST_FILE="src/tests/__tests__"
  echo "Running all tests in src/tests/__tests__..."
fi

# Run Jest with the target file or directory and pass any additional arguments
npx jest "$TEST_FILE" --config jest.config.js --passWithNoTests "${@:2}"
