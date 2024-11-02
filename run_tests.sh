#!/bin/bash

# Description: This script runs Jest tests in the src/tests/__tests__ directory.

# Ensure script runs from the root directory of the project
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT_DIR" || exit

# Run Jest with the specified directory and options
echo "Running tests in src/tests/__tests__..."
npx jest src/tests/__tests__ --config jest.config.js --passWithNoTests "$@"
