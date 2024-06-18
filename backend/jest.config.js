export default {
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.js'],
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
};