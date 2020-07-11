module.exports = {
  globalSetup: './jest.globalSetup.js',
  globalTeardown: './jest.globalTeardown.js',
  moduleFileExtensions: ['ts', 'js', 'json'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/node_modules/'],
  testRegex: '(\\/scenarios\\/.*|(\\.|\\/))test\\.ts$',
};
