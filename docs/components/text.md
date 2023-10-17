# Text 文本

基本文本样式

## 基本用法

由 type 属性来选择 Text 的类型。

::: demo

text/basic

:::

## 尺寸

使用 size 属性配置尺寸，可选的尺寸大小有: large, default 或 small

::: demo

text/size

:::

## 文本省略

通过 ellipsis 属性，在文本超过视图或最大宽度设置时展示省略符。 通过 line-clamp 属性控制多行的样式

::: demo

text/ellipsis

:::

## 标签自定义

使用属性 tag 可实现自定义标签。

::: demo

text/tag

:::

## 自由组合使用

可以和其他组件自由混合使用

::: demo

text/mixed

:::

## Attributes

| 参数       | 说明       | 类型                | 默认值  |
| ---------- | ---------- | ------------------- | ------- |
| type       | 类型       | TextType            | -       |
| size       | 大小       | TextSize            | default |
| tag        | 原生标签   | `string`            | span    |
| ellipsis   | 显示省略号 | `boolean`           | false   |
| line-clamp | 最大行数   | `string` / `number` | -       |

## Slots

| 名称      | 说明     |
| --------- | -------- |
| `default` | 默认内容 |

## Interface

组件导出以下类型定义：

```ts
import type { TextInstance, TextProps, TextType, TextSize } from 'fz-design'
```
