# Empty 空状态

空状态时的占位提示。

## 基本用法

:::demo

empty/basic

:::

## 自定义图片

使用 `image` 属性来设置缺省图片。

:::demo

empty/custom-image

:::

## 图片尺寸

使用 `image-size` 来设置图片大小。

:::demo

empty/image-size

:::

## 底部内容

使用默认插槽 `default` 可在底部插入内容。

:::demo

empty/bottom-content

:::

## Attributes

| 参数        | 说明             | 类型     | 默认值 |
| ----------- | ---------------- | -------- | ------ |
| image       | 缺省图像地址     | `string` | ''     |
| image-size  | 图像尺寸（宽度） | `number` | —      |
| description | 描述信息         | `string` | ''     |

## Slots

| 名称        | 说明         |
| ----------- | ------------ |
| default     | 底部内容     |
| image       | 缺省图片内容 |
| description | 描述内容     |
