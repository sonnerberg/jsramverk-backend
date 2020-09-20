module.exports = {
  testEnvironment: 'node',
  coverageDirectory: 'coverage',
  collectCoverage: true,
  // collectCoverageFrom: [
  //   '**/*.{js,jsx}',
  //   '!**/node_modules/**',
  //   '!**/vendor/**',
  //   '!**/coverage/**',
  //   '!**/models/**',
  //   '!**/test/**',
  //   '!.eslintrc.js',
  //   '!**/jest.config.js',
  // ],
  coverageReporters: ['json', 'lcov', 'text', 'html'],
}
