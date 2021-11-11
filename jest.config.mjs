export default {
  testEnvironment: 'jsdom',
  transform: {
    '\\.ya?ml$': '<rootDir>/test/yaml-transform.mjs',
    '\\.js$': 'babel-jest',
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
};
