export const moduleFileExtensions = ['js', 'json', 'vue'];
export const transform = {
  '^.+\\.js$': 'babel-jest',
  '^.+\\.vue$': '@vue/vue3-jest', // Usa '@vue/vue2-jest' si estás en Vue 2
};
export const moduleNameMapper = {
  '^@/(.*)$': '<rootDir>/src/$1', // Mapea alias como @/ a la carpeta src
};
export const testEnvironment = 'jsdom';
export const preset = '@vue/cli-plugin-unit-jest/presets/no-babel';
export const transformIgnorePatterns = ['/node_modules/'];
export const rootDir = process.cwd();