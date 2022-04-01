module.exports = {
  // 此项是用来告诉eslint找当前配置文件不能往父级查找
  root: true,
  // 全局环境
  env: {
    node: true,
  },
  // 指定如何解析语法。可以为空，但若不为空，只能配该值
  parser: 'vue-eslint-parser',
  // 优先级低于parse的语法解析配置
  parserOptions: {
    // 指定ESlint的解析器
    parser: '@typescript-eslint/parser',
    // 允许使用ES语法
    ecmaVersion: 2020,
    // 允许使用import
    sourceType: 'module',
    // 允许解析JSX
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: ['plugin:vue/vue3-essential', 'plugin:@typescript-eslint/recommended', 'prettier'],
  rules: {
    'vue/no-multiple-template-root': 'off',
    'arrow-parens': 'warn', // 箭头函数用小括号括起来
    'block-spacing': ['error', 'always'], // =>的前/后括号
    'block-scoped-var': 'error', // 块语句中使用var
    'callback-return': 'warn', // 避免多次调用回调什么的
    camelcase: 'error', // 强制驼峰法命名
    eqeqeq: 'error', // 要求使用 === 和 !==
  },
};
