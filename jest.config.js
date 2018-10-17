module.exports = {
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleDirectories: ['node_modules', 'src'],
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{ts, js}',
    '!**/node_modules/**',
  ],
};
