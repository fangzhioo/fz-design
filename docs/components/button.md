# 按钮

按钮

## 基础用法

`type` 属性可以配置不同的主题类型，展示不同的颜色状态

:::demo 基础用法

button/basic

:::

## 加载状态

`loading` 属性可以控制加载状态。

:::demo

button/loading

:::



## 自定义Icon

`icon` 属性接受 `@fz-design/fz-design-icon` 提供的图标。

:::demo

button/icon

:::

## 尺寸

使用 `size` 属性设置按钮的尺寸大小。

:::demo

button/size

:::

## 按钮组

:::demo

button/button-group

:::

## Attributes

| 参数   | 说明 | 类型   | 可选值 | 默认值    | 是否必填 |
| ------ | ---- | ------ | ------ | --------- | -------- |
| `type` | 类型 | string | -      | `default` | 否       |
| `size` | 尺寸 | string | -      | `default` | 否       |

## Slots

| 名称  | 说明 |
| ----- | ---- |
| `icon` | 图标slot  |


## Events

| 事件名  | 说明     | 参数列表 | 参数说明         |
| ------- | -------- | -------- | ---------------- |
| `click` | 点击事件 | $event   | 原生的 dom event |

## Interface

组件导出以下类型定义：

```ts
import type { ButtonInstance, ButtonProps, ButtonType, ButtonSize } from 'fz-design'
```

## 样式变量

组件提供了下列 CSS 变量，可用于自定义样式

| 名称                     | 描述         |
| ------------------------ | ------------ |
| `--fz-button-bg-color`   | 按钮背景色   |
| `--fz-button-text-color` | 按钮文字颜色 |
| `...`                    | ...          |