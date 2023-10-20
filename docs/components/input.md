# Input 输入框

文本输入框

:::danger

🚧 当前组件处于开发阶段，文档更新频繁，尚不稳定，谨慎使用。

:::

## 基本用法

通过 `v-model` 绑定一个值，也可以设置 `maxlength` 来限制文本长度。

:::demo

input/basic

:::

## 尺寸

可以通过 `size` 属性来设置大小，可以设置的值：`large` 、`default` 、 `small`。

:::demo

input/size

:::

## 类型

可以通过 `type` 属性来设置大小，可以设置的值：`text` 、`password` 、`hidden`，默认值为 `text`。

当`type = "password"` 时，可以设置 `show-password` 来开启密码查看功能。

:::demo

input/type

:::

## 可清空

可以通过添加 `clearable` 属性，来控制可清空。

:::demo

input/clearable

:::

## 禁用和只读

通过设置 `disabled` 来禁用。 设置 `readonly` 可设置只读。 两者样式上有一定差异。

:::demo

input/disabled

:::

## 搜索

通过设置 `search` 属性，可以开启默认的搜索。

::: tip

注意，设置了`search`，将无法显示 `after` 插槽的内容。

:::

:::demo

input/search

:::

## 自定义前后缀图标

通过设置 `prefix-icon`来设置前缀图标， `suffix-icon` 设置后缀图标。

:::demo

input/icon

:::

## 前后插槽

通过插槽 `before` 和 `after` 来自由添加前后的内容。

:::demo

input/slot

:::

## Attributes

| 参数         | 说明                     | 类型             | 默认值 |
| ------------ | ------------------------ | ---------------- | ------ |
| modelValue   | 绑定值                   | `string \| number` | ''     |
| name         | 原生 name 属性           | `string`         | -      |
| type         | 类型                     | InputType        | text   |
| size         | 尺寸                     | InputSize        | -      |
| disabled     | 是否禁用                 | `boolean`        | -      |
| readonly     | 是否只读                 | `boolean`        | -      |
| maxlength    | 最大输入长度             | `string \| number` | -      |
| autofocus    | 是否自动获取焦点         | `boolean`        | -      |
| placeholder  | 占位符                   | `string`         | -      |
| clearable    | 是否可清除               | `boolean`        | -      |
| search       | 是否可搜索               | `boolean`        | -      |
| showPassword | 是否显示查看密码的按钮   | `boolean`        | -      |
| suffixIcon   | 后缀 icon                | IconSlotType     | -      |
| prefixIcon   | 前缀 icon                | IconSlotType     | -      |
| autocomplete | 是否开启自动填充特性提示 | `string`         | off    |

## Slots

| 名称   | 说明           |
| ------ | -------------- |
| before | 输入框前的插槽 |
| after  | 输入框后的插槽 |

## Events

| 事件名称 | 说明       | 类型                                                                |
| -------- | ---------- | ------------------------------------------------------------------- |
| input    | 输入时触发 | `(val: string \| number) => void`                                   |
| change   | 修改后触发 | `(val: string \| number) => void`                                   |
| focus    | 获取焦点时 | `(evt: FocusEvent) => void`                                         |
| blur     | 失去焦点时 | `(evt: FocusEvent) => void`                                         |
| search   | 查询时     | `(value: string\|number, evt: MouseEvent \| KeyboardEvent) => void` |
| clear    | 清空时     | `() => void`                                                        |

## Interface

组件导出以下类型定义：

```ts
import type { InputInstance, InputProps, InputType, InputSize } from 'fz-design'
```
