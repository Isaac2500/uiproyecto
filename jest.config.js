module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  transformIgnorePatterns: ['node_modules/?!axios'],
  verbose: true,
  clearMocks: true,
};
