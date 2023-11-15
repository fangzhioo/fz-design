# Image 图片

图片

## 基本用法

可通过 fit 确定图片如何适应到容器框，同原生 [object-fit](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit)。

::: demo

image/basic

:::

## 占位

可通过`slot = placeholder`可自定义占位内容

::: demo

image/placeholder

:::

## 错误

可通过`slot = error`可自定义加载失败内容

::: demo

image/error

:::

## 懒加载

::: tip

如果当前浏览器支持原生图片延迟加载，则先使用原生能力，否则将使用滚动监听实现相同效果。

:::

可通过`lazy`开启懒加载功能， 当图片滚动到可视范围内才会加载。 可通过 `scroll-container` 来设置滚动容器， 若未定义，则为最近一个 `overflow` 值为 `auto` 或 `scroll` 的父元素。

::: demo

image/lazy

:::

## 图片预览

可通过 `previewSrcList` 开启预览大图的功能。 你可以通过 `initial-index` 初始化第一张预览图片的位置。 默认初始位置为 0。

::: demo

image/preview

:::

## API

### Attributes

| 参数                  | 说明               | 类型           | 默认值 |
| --------------------- | ------------------ | -------------- | ------ |
| src                   | 图片地址           | `string`       | ''     |
| fit                   | 填充方式           | `ImageFit`     | ''     |
| loading               | 加载方式           | `ImageLoading` | ''     |
| lazy                  | 是否懒加载         | `boolean`      | ''     |
| preview-src-list      | 预览图片列表       | `string[]`     | []     |
| zIndex                | z-index            | `number`       | -      |
| infinite              | 是否循环查看       | `boolean`      | true   |
| hide-on-click-modal   | 点击遮罩层关闭     | `boolean`      | -      |
| close-on-press-escape | 按 esc 关闭        | `boolean`      | true   |
| teleported            | 是否插入到 body 上 | `boolean`      | -      |
| zoom-rate             | 缩放倍数           | `number`       | 1.2    |
| min-scale             | 最小缩放比例       | `number`       | 0.2    |
| max-scale             | 最大缩放比例       | `number`       | 7      |

### Events

| 事件名称 | 说明           | 类型                    |
| -------- | -------------- | ----------------------- |
| load     | 加载完毕后触发 | `(evt: Event) => void`  |
| error    | 加载出错时     | `(evt: Event) => void`  |
| switch   | 预览图片切换时 | `(val: number) => void` |
| close    | 预览图片关闭时 | `() => void`            |
| show     | 预览图片显示时 | `() => void`            |
