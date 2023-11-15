# Input 输入框

通过鼠标或键盘输入字符

:::warning

Input 为受控组件，它 **总会显示 Vue 绑定值**。

在正常情况下，input 的输入事件应该被正常响应。 它的处理程序应该更新组件的绑定值 (或使用 `v-model`)。 否则，输入框的值将不会改变。

不支持 `v-model` 修饰符。

:::

## 基础用法

可以通过 `type = "hidden"` 隐藏输入框。

:::demo

input/basic

:::

## 禁用

:::demo 通过 `disabled` 属性指定是否禁用 input 组件

input/disabled

:::

## 一键清空

:::demo 使用 `clearable` 属性即可得到一个可一键清空的输入框

input/clearable

:::

## 格式化

在 `formatter` 的情况下显示值，我们通常同时使用 `parser`

:::demo

input/formatter

:::

## 密码框

:::demo 使用 `show-password` 属性即可得到一个可切换显示隐藏的密码框

input/password

:::

## 带图标的输入框

带有图标标记输入类型

:::demo 要在输入框中添加图标，你可以简单地使用 `prefix-icon` 和 `suffix-icon` 属性。 另外， `prefix` 和 `suffix` 命名的插槽也能正常工作。

input/with-icon

:::

## 复合型输入框

可以在输入框中前置或后置一个元素，通常是标签或按钮。

:::demo 可通过 `slot` 来指定在 `Input` 中分发的前置或者后置的内容。

input/mixed-input

:::

## 尺寸

:::demo 使用 `size` 属性改变输入框大小。 除了默认大小 `default` 外，还有另外两个选项： `large`, `small`。

input/various-size

:::

## 输入长度限制

:::demo 使用 `maxlength` 和 `minlength` 属性, 来控制输入内容的最大字数和最小字数。 "字符数"使用 JavaScript 字符串长度来衡量。 为文本或文本输入类型设置 `maxlength` prop 可以限制输入值的长度。 允许你通过设置 `show-word-limit` 到 `true` 来显示剩余字数。

input/length-limiting

:::

## API

### Attributes

| 参数                  | 说明                                    | 类型                                                                                | 默认值 |
| --------------------- | --------------------------------------- | ----------------------------------------------------------------------------------- | ------ |
| type                  | 类型                                    | [NativeInputTypes](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input) | text   |
| model-value / v-model | 绑定值                                  | `string \| number`                                                                  | —      |
| maxlength             | 最大长度                                | `string \| number`                                                                  | —      |
| minlength             | 原生`minlength`属性                     | `number`                                                                            | —      |
| show-word-limit       | 是否展示文字长度，仅`type="text"`时生效 | `boolean`                                                                           | false  |
| placeholder           | 占位符                                  | `string`                                                                            | —      |
| clearable             | 是否展示清空                            | `boolean`                                                                           | false  |
| formatter             | 格式化，仅`type="text"`时生效           | `(value: string \| number) => string`                                               | —      |
| parser                | 解析格式化，仅`type="text"`时生效       | `(value: string) => string`                                                         | —      |
| show-password         | 是否展示密码                            | `boolean`                                                                           | false  |
| disabled              | 是否禁用                                | `boolean`                                                                           | false  |
| size                  | 尺寸                                    | `'large' \| 'default' \| 'small'`                                                   | —      |
| prefix-icon           | 自定义前缀图标                          | IconSlotType                                                                        | —      |
| suffix-icon           | 自定义后缀图标                          | IconSlotType                                                                        | —      |
| autocomplete          | 原生 `autocomplete` 属性                | `string`                                                                            | off    |
| name                  | 原生 `name` 属性                        | `string`                                                                            | —      |
| readonly              | 原生 `readonly` 属性                    | `boolean`                                                                           | false  |
| max                   | 原生 `max` 属性                         | —                                                                                   | —      |
| min                   | 原生 `min` 属性                         | —                                                                                   | —      |
| step                  | 原生 `step` 属性                        | —                                                                                   | —      |
| resize                | 控制是否能被用户缩放                    | `'none' \| 'both' \| 'horizontal' \| 'vertical'`                                    | —      |
| autofocus             | 原生`autofocus`属性，自动获取焦点       | `boolean`                                                                           | false  |
| form                  | 原生 `form` 属性                        | `string`                                                                            | —      |
| label                 | 原生 `aria-label` 属性                  | `string`                                                                            | —      |
| tabindex              | 输入框的 `tabindex`                     | `string \| number`                                                                  | —      |
| validate-event        | 输入时是否触发表单的校验                | `boolean`                                                                           | true   |
| input-style           | input 元素的 style                      | `CSSProperties \| CSSProperties[] \| string[] \| string`                            | {}     |

### Slots

| 名称    | 说明           |
| ------- | -------------- |
| prefix  | 输入框头部内容 |
| suffix  | 输入框尾部内容 |
| prepend | 输入框前置内容 |
| append  | 输入框后置内容 |

### Events

| 事件名称 | 说明                                                          | 类型                              |
| -------- | ------------------------------------------------------------- | --------------------------------- |
| input    | 在 Input 值改变时触发                                         | `(val: string \| number) => void` |
| change   | 仅当 modelValue 改变时，当输入框失去焦点或用户按 Enter 时触发 | `(val: string \| number) => void` |
| focus    | 获取焦点时                                                    | `(evt: FocusEvent) => void`       |
| blur     | 失去焦点时                                                    | `(evt: FocusEvent) => void`       |
| clear    | 在点击由 `clearable` 属性生成的清空按钮时触发                 | `() => void`                      |

### Exposes

| 名称   | 描述                | 类型                    |
| ------ | ------------------- | ----------------------- |
| blur   | 使 input 失去焦点   | `() => void`            |
| focus  | 使 input 获取焦点   | `() => void`            |
| clear  | 清除 input 值       | `() => void`            |
| input  | Input HTML 元素     | `Ref<HTMLInputElement>` |
| select | 选中 input 中的文字 | `() => void`            |

### Interface

组件导出以下类型定义：

```ts
import type { InputInstance, InputProps, InputType, InputSize } from 'fz-design'
```
