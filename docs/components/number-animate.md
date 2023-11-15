# NumberAnimate 数字滚动

用滚动的方式展示不同的数字

## 基本用法

通过 `from` 和 `to` 属性来设置开始值和结束值。通过 `loop` 属性来设置是否循环播放。

:::demo 

number-animate/basic

:::

## 格式化

可以通过 `formatter` 来格式化一个数字，接收一个函数，默认为 `(num: number) => num.toLocaleString()`来格式化。

:::demo 

number-animate/formatter

:::


## 大小

默认了三种大小，`large`、`default`、`small`，默认值为 `default`。

:::demo 由 `size` 属性来配置字体大小。

number-animate/size

:::

## 类型

可以设置展示的不同风格的颜色。

:::demo 由属性 `type` 来设置不同的字体颜色

number-animate/type

:::

## 动画时间

通过设置 `duration` 来设置动画的滚动时长。

:::demo

number-animate/duration

:::

## 控制播放

通过获取组件，来调用 `run` 方法来实现动画的播放。

:::demo

number-animate/play

:::

## API

### Attributes

| 参数      | 说明                   | 类型            | 默认值                                |
| --------- | ---------------------- | --------------- | ------------------------------------- |
| form      | 开始的动画数字         | `number`        | 0                                     |
| to        | 结束的动画数字         | `number`        | -                                     |
| size      | 尺寸                   | `string`        | ''                                    |
| type      | 类型                   | `string`        | ''                                    |
| duration  | 执行动画结束的大概时间 | `number`        | 2000                                  |
| loop      | 是否循环播放           | `boolean`       | false                                  |
| interval  | 循环间隔时间           | `number`        | 3000                                  |
| formatter | 对数字决定金额格式化   | `Function`      | (num: number) => num.toLocaleString() |
| automatic | 是否初始化自动播放     | `boolean`       | true                                  |
| styles    | 样式列表               | `CSSProperties` | -                                     |

### Events

| 事件名称 | 说明           | 类型                        |
| -------- | -------------- | --------------------------- |
| end      | 动画结束时触发 | `(elapsed: number) => void` |
