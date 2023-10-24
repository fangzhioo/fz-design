# Tag 标签

用于标记

## 基本用法

由 `type` 属性来选择 `tag` 的类型。 也可以通过 `color` 属性来自定义背景色。

:::demo

tag/basic

:::

## 可移除标签

设置 `closable` 属性可以定义一个标签是否可移除。 它接受一个 `Boolean`。 默认的标签移除时会附带渐变动画。 如果不想使用，可以设置 `disable-transitions` 属性，它接受一个 `Boolean`，`true` 为关闭。 当 `Tag` 被移除时会触发 `close` 事件。

:::demo

tag/closable

:::

## 动态编辑

模拟动态新增删除列表

:::demo

tag/dynamic

:::

## 尺寸

`Tag` 组件提供除了默认值以外的三种尺寸，可以在不同场景下选择合适的按钮尺寸。

使用 `size` 属性来设置额外尺寸, 可选值包括 `large`, `default` 或 `small`.

:::demo

tag/size

:::

## 主题

`Tag` 组件提供了三个不同的主题：`dark`、`light` 和 `plain`。

通过设置 `effect` 属性来改变主题，默认为 `light`。

:::demo

tag/theme

:::

## 圆形标签

`Tag` 可以向按钮组件一样变为完全圆形。

:::demo

tag/round

:::

## Attributes

| 参数                | 说明             | 类型                                                 | 默认值 |
| ------------------- | ---------------- | ---------------------------------------------------- | ------ |
| type                | 类型             | `'success' \| 'info' \| 'warning' \| 'danger' \| ''` | ''     |
| closable            | 是否可清空       | `boolean`                                            | false  |
| disable-transitions | 是否禁用渐变动画 | `boolean`                                            | false  |
| hit                 | 是否有边框描边   | `boolean`                                            | false  |
| color               | 背景色           | `string`                                             | ''     |
| size                | Tag 的尺寸       | `'large' \| 'default' \| 'small' \| ''`              | ''     |
| effect              | Tag 的主题       | `'dark' \| 'light' \| 'plain'`                       | light  |
| round               | 是否为圆形       | `boolean`                                            | false  |

## Slots

| 名称    | 说明     |
| ------- | -------- |
| default | 默认内容 |

## Events

| 事件名称 | 说明       | 类型                        |
| -------- | ---------- | --------------------------- |
| click    | 点击时触发 | `(evt: MouseEvent) => void` |
| close    | 清空时触发 | `(evt: MouseEvent) => void` |
