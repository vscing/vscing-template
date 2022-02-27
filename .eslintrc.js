module.exports = {
  root: true, // 当前配置为根配置，将不再从上级文件夹查找配置
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser', // 采用@typescript-eslint/parser 作为语法解析器
    ecmaVersion: 2020,
    sourceType: 'module',  // 指定来源的类型，有两种script或module
    jsxPragma: 'React',
    ecmaFeatures: {
      jsx: true
    }
  },
  env: {
    node: true,
    browser: true, // 设置为所需检查的代码是在浏览器环境运行的
    es6: true // 设置所需检查代码为 es6 语法书写
  },
  globals: {
    Markdown: true
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended'
    // 'plugin:jest/recommended',
  ],
  rules: {
    'no-var': 'error', // 不能使用var声明变量
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^h$',
        varsIgnorePattern: '^h$'
      }
    ],
    'no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^h$',
        varsIgnorePattern: '^h$'
      }
    ],
    'space-before-function-paren': 'off',
    'quotes': ['error', 'single'],
    'indent': ['error', 2, { SwitchCase: 1 }], // error类型，缩进2个空格
    'no-console': ['error', { allow: ['error', 'warn', 'info'] }], // 允许使用console.log()
    'vue/require-default-prop': 'off',
    'vue/custom-event-name-casing': 'off',
    'no-use-before-define': 'off',
    'vue/comment-directive': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/html-self-closing': 'off',
    'vue/max-attributes-per-line': 'off'
  }
}
