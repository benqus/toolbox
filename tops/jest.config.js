/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true,
  collectCoverage: true,
  verbose: true,
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.json'
    }
  }
};
