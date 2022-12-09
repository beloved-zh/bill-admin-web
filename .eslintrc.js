module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    '@antfu/eslint-config'
  ],
  /*
   *  自定义规则
   *  错误级别分为三种：
   *  - "off" 或 0 ：关闭规则
   *  - "warn" 或 1 ：开启规则，使用警告级别错误
   *  - "error" 或 2 ：开启规则，使用错误级别错误
   */
  // 注意：@antfu引入的是TS基本配置，部分规则需要修改 @typescript-eslint 下的
  rules: {
    'no-console': 'off',
    // 尾随逗号
    '@typescript-eslint/comma-dangle': ['error', 'never'],
    'vue/comma-dangle': ['error', 'never'],
    // 单行是否省略大括号
    'curly': ['error', 'all'],
    // 大括号换行风格
    '@typescript-eslint/brace-style': ['warn', '1tbs'],
    // 箭头函数可以省略括号
    'arrow-parens': ['error', 'as-needed'],
    // vue 模板组件名称横线连接
    'vue/component-name-in-template-casing': ['error', 'kebab-case', {
      registeredComponentsOnly: true,
      ignores: []
    }]
  }
}
