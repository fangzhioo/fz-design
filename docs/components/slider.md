# Slider 滑块

用滑动的方式改变数值

## 基本用法

使用 `v-model` 绑定一个数字

:::demo

slider/basic

:::

## 禁用

可以通过设置 `disabled` 属性，来设置是否禁用。

:::demo

slider/disabled

:::

## 步长

可以通过设置 `step` 属性可以设置步长。

:::demo

slider/step

:::

## Attributes

| 参数                  | 说明     | 类型      | 默认值 |
| --------------------- | -------- | --------- | ------ |
| v-model / model-value | 绑定值   | `number`  | 0      |
| step                  | 步长     | `number`  | 1      |
| min                   | 最小值   | `number`  | 0      |
| max                   | 最大值   | `number`  | 100    |
| disabled              | 是否禁用 | `boolean` | false  |

## Events

| 事件名称 | 说明                                               | 类型                    |
| -------- | -------------------------------------------------- | ----------------------- |
| change   | 值改变时触发（使用鼠标拖曳时，只在松开鼠标后触发） | `(val: number) => void` |
| input    | 数据改变时触发（使用鼠标拖曳时，活动过程实时触发） | `(val: number) => void` |

