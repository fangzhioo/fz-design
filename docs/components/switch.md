# Switch 开关

表示两种相互对立的状态间的切换，多用于触发「开/关」。

## 基本用法

绑定 `v-model` 到一个 `Boolean` 类型的变量。 可以使用 `--fz-switch-on-color` 属性与 `--fz-switch-off-color` 属性来设置开关的背景色。

:::demo

switch/basic

:::

## 尺寸

通过设置 `size` 来设置大小。

:::demo

switch/sizes

:::

## 文字描述

使用 `active-text` 属性与 `inactive-text` 属性来设置开关的文字描述。 使用 `inline-prompt` 属性来控制文本是否显示在点内。

使用 `active-text` 属性与 `inactive-text` 属性来设置开关的文字描述。

:::demo

switch/text-description

:::

## 显示自定义图标

:::tip

使用 `inactive-icon` 和 `active-icon` 属性来添加图标。 您可以传递组件名称的字符串（提前注册）或组件本身是一个 SVG Vue 组件。 FzDesign 提供了一组图标，您可以在 [FzDesignIcon](https://www.npmjs.com/package/@fz-design/fz-design-icon) 查看。

:::

使用 `inactive-icon` 和 `active-icon` 属性来添加图标。 使用 `inline-prompt` 属性来控制图标显示在点内。

:::demo

switch/custom-icons

:::

## 扩展的 value 类型

你可以设置 `active-value` 和 `inactive-value` 属性， 它们接受 `Boolean`、`String` 或 `Number` 类型的值。

:::demo

switch/extended-value-types

:::

## 禁用状态

设置 `disabled` 属性，接受一个 `Boolean` ，设置 `true` 即可禁用。

:::demo

switch/disabled

:::

## 加载状态

设置 `loading` 属性，接受一个 `Boolean`，设置 `true` 即加载中状态。

:::demo

switch/loading

:::

## 阻止切换

设置 `beforeChange` 属性，若返回 `false` 或者返回 `Promise` 且被 `reject`，则停止切换。

:::demo

switch/prevent-switching

:::

## 自定义动作图标

使用 `inactive-action-icon` 和 `active-action-icon` 属性来添加图标。

:::demo

switch/custom-action-icon

:::

## Attributes

| 参数                 | 说明                                                                         | 类型                                | 默认值 |
| -------------------- | ---------------------------------------------------------------------------- | ----------------------------------- | ------ |
| model-value          | 绑定值                                                                       | `boolean \| string \| number`       | false  |
| size                 | 尺寸                                                                         | `SwitchSize`                        | -      |
| width                | 宽度                                                                         | `string \| number`                  | ''     |
| disabled             | 是否禁用                                                                     | `boolean`                           | false  |
| loading              | 是否加载态                                                                   | `boolean`                           | false  |
| inline-prompt        | 无论图标或文本是否显示在点内，只会呈现文本的第一个字符                       | `boolean`                           | false  |
| inactive-action-icon | 关闭时 Icon                                                                  | `IconSlotType`                      | -      |
| active-action-icon   | 开启时 Icon                                                                  | `IconSlotType`                      | -      |
| active-icon          | 开启时展示 Icon，会覆盖`active-text`                                         | `IconSlotType`                      | -      |
| inactive-icon        | 关闭时展示 Icon，会覆盖`inactive-text`                                       | `IconSlotType`                      | -      |
| active-text          | 开启时，展示文本                                                             | `string`                            | ''     |
| inactive-text        | 关闭时，展示文本                                                             | `string`                            | ''     |
| active-value         | 开启时的值                                                                   | `boolean \| string \| number`       | ''     |
| inactive-value       | 关闭时的值                                                                   | `boolean \| string \| number`       | ''     |
| name                 | 原生 input 的 name                                                           | `string`                            | ''     |
| validate-event       | 是否触发 form 的校验事件                                                     | `boolean`                           | true   |
| before-change        | switch 状态改变前的钩子， 返回 false 或者返回 Promise 且被 reject 则停止切换 | `() => Promise<boolean> \| boolean` | -      |

## Events

| 事件名称 | 说明   | 类型                                         |
| -------- | ------ | -------------------------------------------- |
| input    | 输入时 | `(val: boolean \| string \| number) => void` |
| change   | 改变时 | `(val: boolean \| string \| number) => void` |
