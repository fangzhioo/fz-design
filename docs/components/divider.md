# Divider 分割线

一条分割内容的分割线

## 基本用法

分割文本

:::demo

divider/basic

:::

## 自定义内容

自定义分割线中显示的内容

:::demo

divider/custom-content

:::

## 虚线

设置不同的样式

:::demo

divider/line-dashed

:::

## 垂直分割线

:::demo

divider/vertical-divider

:::

## API

### Attributes

| 参数             | 说明                   | 类型                                                                                                                                 | 默认值     |
| ---------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ---------- |
| direction        | 设置分割线方向         | `'horizontal' \| 'vertical'`                                                                                                         | horizontal |
| border-style     | 分割线样式             | `'none' \| 'solid' \| 'hidden' \| 'dashed' \| ...` [css/border-style](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-style) | solid      |
| content-position | 自定义分隔线内容的位置 | `'left' \| 'right' \| 'center' `                                                                                                     | center     |

### Slots

| 名称    | 说明               |
| ------- | ------------------ |
| default | 自定义分割线的内容 |
