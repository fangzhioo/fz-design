# Textarea 文本域

精致的文本域组件

## 基本用法

通过 `v-model` 绑定一个值

:::demo

textarea/basic

:::

## 禁用和只读

通过设置 `disabled` 来禁用。 设置 `readonly` 可设置只读。 两者样式上有一定差异。

:::demo

textarea/disabled

:::

## 最大长度

可以设置 `maxlength` 来限制文本长度。

:::demo

textarea/maxlength

:::

## 自适应

设置文字输入类型的 `autosize` 属性使得根据内容自动调整的高度。 你可以给 `autosize` 提供一个包含有最大和最小高度的对象，让输入框自动调整。

:::demo

textarea/autosize

:::

## API

### Attributes

| 参数         | 说明                     | 类型               | 默认值 |
| ------------ | ------------------------ | ------------------ | ------ |
| modelValue   | 绑定值                   | `string \| number` | ''     |
| disabled     | 是否禁用                 | `boolean`          | -      |
| readonly     | 是否只读                 | `boolean`          | -      |
| maxlength    | 最大输入长度             | `string \| number` | -      |
| autofocus    | 是否自动获取焦点         | `boolean`          | -      |
| placeholder  | 占位符                   | `string`           | -      |
| autocomplete | 是否开启自动填充特性提示 | `string`           | off    |

### Events

| 事件名称 | 说明       | 类型                              |
| -------- | ---------- | --------------------------------- |
| input    | 输入时触发 | `(val: string \| number) => void` |
| change   | 修改后触发 | `(val: string \| number) => void` |
| focus    | 获取焦点时 | `(evt: FocusEvent) => void`       |
| blur     | 失去焦点时 | `(evt: FocusEvent) => void`       |

### Interface

组件导出以下类型定义：

```ts
import type {
  TextareaInstance,
  TextareaProps,
  TextareaAutoSize,
  TextareaResize
} from 'fz-design'
```

### Exposes

组件向外暴露的方法

| 名称           | 说明               | 类型                       |
| -------------- | ------------------ | -------------------------- |
| clear          | 输入时触发         | `() => void`               |
| select         | 修改后触发         | `() => void`               |
| focus          | 获取焦点时         | `() => void`               |
| blur           | 失去焦点时         | `() => void`               |
| resizeTextarea | 改变 textarea 大小 | `() => void`               |
| textarea       | HTML textarea 元素 | `Ref<HTMLTextAreaElement>` |
