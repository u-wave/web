export default {
  testEnvironment: 'jsdom',
  transform: {
    '\\.ya?ml$': '<rootDir>/test/yaml-transform.mjs',
    '\\.js$': 'babel-jest',
  },
  moduleNameMapper: {
    // Prevent jest from picking up the ESM version.
    '^uuid$': '<rootDir>/node_modules/uuid/dist/index.js',
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
};
