# ConfigProvider 全局配置

全局配置

## 基本用法

::: demo

config-provider/basic

:::

## API

### Attributes

| 参数   | 说明         | 类型                              | 默认值  |
| ------ | ------------ | --------------------------------- | ------- |
| locale | 国际化对象   | Lang                              | zh      |
| size   | 全局组件大小 | `'large' \| 'default' \| 'small'` | default |

### Slots

| 名称      | 说明     | Scope                              |
| --------- | -------- | ---------------------------------- |
| `default` | 默认内容 | config: 提供全局配置（从顶部继承） |
