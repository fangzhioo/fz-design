# Danmaku 弹幕

弹幕交互组件

## 基本用法

基本用法，通过 `danmus` 或者 `v-model:danmus` 绑定一个弹幕列表。

::: demo

danmaku/basic

:::

## 自定义设置

通过一些可以自定义的设置，包括自定义弹幕的内容显示。

::: demo

danmaku/custom

:::

## API

### Attributes

| 参数                  | 说明                                                 | 类型                   | 默认值 |
| --------------------- | ---------------------------------------------------- | ---------------------- | ------ |
| model-value / v-model | 弹幕元素列表，支持纯文本或者自定义对象(支持 v-model) | `string[] \| object[]` | []     |
| channels              | 轨道数量                                             | `number`               | 0      |
| autoplay              | 是否自动播放                                         | `boolean`              | true   |
| use-slot              | 是否开启弹幕插槽                                     | `boolean`              | false  |
| loop                  | 是否开启弹幕循环                                     | `boolean`              | false  |
| hidden                | 是否隐藏                                             | `boolean`              | false  |
| font-size             | 弹幕字号（slot 模式下不可用）                        | `number`               | 18     |
| extra-style           | 额外样式（slot 模式下不可用）                        | `string`               | -      |
| speeds                | 弹幕速度（每秒移动的像素数）                         | `number`               | 200    |
| debounce              | 弹幕刷新频率(ms)                                     | `number`               | 100    |
| random-channel        | 随机选择轨道插入                                     | `boolean`              | false  |
| is-suspend            | 是否开启弹幕悬浮暂停（试验型功能）                   | `boolean`              | true   |
| top                   | 弹幕垂直间距(px)                                     | `number`               | 4      |
| right                 | 弹幕水平间距(px)                                     | `number`               | 0      |

### Slots

| 名称    | 说明       |
| ------- | ---------- |
| default | 默认内容   |
| dm      | 自定义弹幕 |

### Events

| 事件名称 | 说明                                           | 类型                           |
| -------- | ---------------------------------------------- | ------------------------------ |
| list-end | 所有弹幕插入完毕                               | `() => void`                   |
| play-end | 所有弹幕播放完成（已滚出屏幕）                 | `(index: number) => void`      |
| dm-over  | 开启弹幕悬浮暂停时，当进入弹幕，暂停时触发     | `(dm: string\|object) => void` |
| dm-out   | 开启弹幕悬浮暂停时，当离开弹幕，恢复滚动时触发 | `(dm: string\|object) => void` |

### Exposes

| 名称           | 说明                                         | 类型                             |
| -------------- | -------------------------------------------- | -------------------------------- |
| play           | 开始/继续播放                                | `() => void`                     |
| pause          | 暂停弹幕播放                                 | `() => void`                     |
| stop           | 停止播放并清空弹幕                           | `() => void`                     |
| reset          | 重置配置                                     | `() => void`                     |
| resize         | 容器尺寸改变时重新计算滚动距离（需手动调用） | `() => void`                     |
| push           | 发送弹幕（插入到弹幕列表末尾，排队显示）     | `(dm: string \| object) => void` |
| add            | 发送弹幕（插入到当前播放位置，实时显示）     | `(dm: string \| object) => void` |
| insert         | 绘制弹幕（实时插入，不进行数据绑定）         | `(dm: string \| object) => void` |
| get-play-state | 获得当前播放状态                             | `() => boolean`                  |
