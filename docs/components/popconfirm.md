# Popconfirm 气泡确认

点击某个元素弹出一个简单的气泡确认框

:::tip

在 SSR 场景下，您需要将组件包裹在 `<client-only></client-only>` 之中 (如: [Nuxt](https://nuxt.com/v3)) 和 SSG (如: [VitePress](https://vitepress.vuejs.org/)).

:::

## 基础用法

`Popconfirm` 的属性与 `Tooltip` 很类似， 因此对于重复属性，请参考 `Tooltip` 的文档，在此文档中不做详尽解释。

:::demo 在 `Popconfirm` 中，只有 `title` 属性可用，`content` 属性会被忽略。

popconfirm/basic

:::

## 自定义弹出框的内容

可以在 `Popconfirm` 中自定义内容。

:::demo

popconfirm/customize

:::

## 触发事件

点击按钮触发事件

:::demo

popconfirm/trigger-event

:::

## Attributes

| 参数                | 说明                                                                                   | 类型               | 默认值          |
| ------------------- | -------------------------------------------------------------------------------------- | ------------------ | --------------- |
| title               | 标题                                                                                   | `string`           | —               |
| confirm-button-text | 确认按钮文字                                                                           | `string`           | —               |
| cancel-button-text  | 取消按钮文字                                                                           | `string`           | —               |
| confirm-button-type | 确认按钮类型                                                                           | `ButtonType`       | primary         |
| cancel-button-type  | 取消按钮类型                                                                           | `ButtonType`       | text            |
| icon                | 自定义图标                                                                             | `IconSlotType`     | IconAlertCircle |
| icon-color          | `Icon` 颜色                                                                            | `string`           | #f90            |
| hide-icon           | 是否隐藏 `Icon`                                                                        | `boolean`          | false           |
| hide-after          | 关闭时的延迟                                                                           | `number`           | 200             |
| teleported          | 是否 `tooltip` 插入至 `body` 元素                                                      | `boolean`          | true            |
| persistent          | 当 `tooltip` 组件长时间不触发且 `persistent` 属性设置为 `false` 时, 弹出组件将会被删除 | `boolean`          | false           |
| width               | 弹层宽度，最小宽度 `150px`                                                             | `string \| number` | 150             |

## Slots

| 名称      | 说明                               |
| --------- | ---------------------------------- |
| reference | 触发 `Popconfirm` 显示的 HTML 元素 |

## Events

| 事件名称 | 说明               | 类型                      |
| -------- | ------------------ | ------------------------- |
| confirm  | 点击确认按钮时触发 | `(e: MouseEvent) => void` |
| cancel   | 点击取消按钮时触发 | `(e: MouseEvent) => void` |
