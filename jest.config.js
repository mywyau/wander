// jest.config.js
const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./", // Path to the Next.js project root
});

/** @type {import('jest').Config} */
const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/src/tests/jest.setup.ts"], // Setup file within the tests directory
  testEnvironment: "jest-environment-jsdom", // Use jsdom for React component testing
  moduleNameMapper: {
    "^@/components/(.*)$": "<rootDir>/src/components/$1",
    "^@/app/(.*)$": "<rootDir>/src/app/$1",
    "^@/lib/(.*)$": "<rootDir>/src/lib/$1",
    "^@/hooks/(.*)$": "<rootDir>/src/hooks/$1",
  },
  roots: ["<rootDir>/src/app", "<rootDir>/src/tests"], // Specify where Jest should look for test files
  testMatch: ["**/__tests__/**/*.[jt]s?(x)"], // Match files in __tests__ directories
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest", // Use ts-jest for TypeScript files
  },
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}", // Collect coverage from all source files
    "!src/tests/**", // Exclude test files from coverage
  ],
};

// Export the custom Jest configuration
module.exports = createJestConfig(customJestConfig);
