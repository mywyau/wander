#!/bin/bash

# Description: This script runs Jest tests located in the src/tests/__tests__ directory.

# Ensure the script is executed from the project root
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT_DIR" || exit

# Run Jest specifically targeting the src/tests/__tests__ directory
echo "Running tests in src/tests/__tests__..."
npx jest src/tests/__tests__ --config jest.config.js --passWithNoTests "$@"
