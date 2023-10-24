# ImagePreview 图片预览

图片预览

## 基本用法

::: demo

image-preview/basic

:::

## Attributes

| 参数                  | 说明               | 类型       | 默认值 |
| --------------------- | ------------------ | ---------- | ------ |
| urlList               | 图片列表           | `string[]` | []     |
| zIndex                | z-index            | `number`   | -      |
| infinite              | 是否循环查看       | `boolean`  | true   |
| hide-on-click-modal   | 点击遮罩层关闭     | `boolean`  | -      |
| close-on-press-escape | 按 esc 关闭        | `boolean`  | true   |
| teleported            | 是否插入到 body 上 | `boolean`  | -      |
| zoom-rate             | 缩放倍数           | `number`   | 1.2    |
| min-scale             | 最小缩放比例       | `number`   | 0.2    |
| max-scale             | 最大缩放比例       | `number`   | 7      |

## Events

| 事件名称 | 说明   | 类型                      |
| -------- | ------ | ------------------------- |
| close    | 关闭时 | `() => void`              |
| switch   | 切换时 | `(index: number) => void` |
| rotate   | 旋转时 | `(deg: number) => void`   |
