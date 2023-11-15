# Avatar 头像

封装头像组件

## 基本用法

头像组件可以用来代表人物或对象， 支持使用图片、图标或者文字作为 Avatar。

## 基本用法

使用 shape 和 size 属性来设置 Avatar 的形状和大小。

:::demo

avatar/basic

:::

## 类型

支持使用图片，图标或者文字作为 Avatar。

:::demo

avatar/types

:::

## 加载失败

图片加载失败时的展示。

:::demo

avatar/fallback

:::

## 自适应容器

当使用图片作为用户头像时，设置该图片如何在容器中展示， 和 [object-fit](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit) 一致。

:::demo

avatar/fit

:::

## API

### Attributes

| 参数    | 说明                                         | 类型                   | 默认值  |
| ------- | -------------------------------------------- | ---------------------- | ------- |
| icon    | 图标类型，具体参考 Icon 组件                 | `IconSlotType`         | —       |
| size    | 大小                                         | `number ｜ AvatarSize` | default |
| shape   | 形状                                         | `'circle' \| 'square'` | circle  |
| src     | 图片地址                                     | `string`               | —       |
| src-set | img 的原生`srcset`属性                       | `string`               | —       |
| alt     | img 的原生`alt`属性                          | `string`               | —       |
| fit     | 当展示类型为图片的时候，设置图片如何适应容器 | `ImageFit`             | cover   |

### Slots

| 名称    | 说明               |
| ------- | ------------------ |
| default | 图片加载失败时触发 |

### Events

| 事件名称 | 说明               | 类型                 |
| -------- | ------------------ | -------------------- |
| error    | 自定义头像展示内容 | `(e: Event) => void` |
