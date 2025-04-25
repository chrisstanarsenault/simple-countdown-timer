import { globalIgnores } from 'eslint/config'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import pluginVue from 'eslint-plugin-vue'
import pluginOxlint from 'eslint-plugin-oxlint'

// To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
// import { configureVueProject } from '@vue/eslint-config-typescript'
// configureVueProject({ scriptLangs: ['ts', 'tsx'] })
// More info at https://github.com/vuejs/eslint-config-typescript/#advanced-setup

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },

  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

  pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,
  ...pluginOxlint.configs['flat/recommended'],
)

const INLINE_ELEMENTS = require('eslint-plugin-vue/lib/utils/inline-non-void-elements.json')

module.exports = {
  env: {
    node: true,
    'vue/setup-compiler-macros': true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    '@vue/typescript/recommended',
    'plugin:storybook/recommended',
  ],
  ignorePatterns: [
    '**/*.mdx',
    '**/*.css',
    'src/scripts/*.js',
    'src/**/*.typegen.ts',
    'src/graphql/**/*.ts',
  ],
  rules: {
    'vue/multi-word-component-names': 'off',
    'vue/multiline-html-element-content-newline': ['error', {
      'ignoreWhenEmpty': true,
      'ignores': ['RouterLink', ...INLINE_ELEMENTS],
      'allowEmptyLines': false,
    }],
    '@typescript-eslint/ban-ts-ignore': 0,
    '@typescript-eslint/indent': ['error', 2],
    'linebreak-style': [
      'error',
      'unix',
    ],
    'quotes': [
      'error',
      'single', {
        'allowTemplateLiterals': true,
      },
    ],
    'semi': [
      'error',
      'never',
    ],
    'space-before-function-paren': [
      'warn',
      'always',
    ],
    'keyword-spacing': [
      'error',
    ],
    'space-before-blocks': [
      'error',
    ],
    'object-curly-spacing': [
      'warn',
      'always',
    ],
    'eol-last': [
      'error',
      'always',
    ],
    'comma-dangle': [
      'error',
      {
        'arrays': 'always-multiline',
        'objects': 'always-multiline',
        'imports': 'always-multiline',
        'exports': 'always-multiline',
        'functions': 'never',
      },
    ],
  },
}
