# Slider 滑块

通过拖动滑块在一个固定区间内进行选择

:::tip

在 SSR 场景下，您需要将组件包裹在 `<client-only></client-only>` 之中 (如: [Nuxt](https://nuxt.com/v3)) 和 SSG (如: [VitePress](https://vitepress.vuejs.org/)).

:::

## 基础用法

在拖动滑块时，显示当前值

:::demo 通过设置绑定值自定义滑块的初始值

slider/basic

:::

## 离散值

选项可以是离散的

:::demo 改变 `step` 的值可以改变步长， 通过设置 `show-stops` 属性可以显示间断点

slider/discrete-values

:::

## 带有输入框的滑块

通过输入框输入来改变当前的值。

:::demo 设置 `show-input` 属性会在右侧显示一个输入框

slider/slider-with-input-box

:::

## 不同尺寸

:::demo

slider/sizes

:::

## 位置

您可以自定义 `Tooltip` 提示的位置。

:::demo

slider/placement

:::

## 范围选择

你还可以选择一个范围值

:::demo 配置 `range` 属性以激活范围选择模式，该属性的绑定值是一个数组，由最小边界值和最大边界值组成。

slider/range-selection

:::

## 垂直模式

:::demo 配置 `vertical` 属性为 `true` 启用垂直模式。 在垂直模式下，必须设置 `height` 属性。

slider/vertical-mode

:::

## 显示标记

:::demo 设置 `marks` 属性可以在滑块上显示标记。

slider/show-marks

:::

## API

### Attributes

| 参数                  | 说明                                                                                                     | 类型              | 默认值  |
| --------------------- | -------------------------------------------------------------------------------------------------------- | ----------------- | ------- |
| model-value / v-model | 绑定值                                                                                                   | `number`          | 0       |
| min                   | 最小值                                                                                                   | `number`          | 0       |
| max                   | 最大值                                                                                                   | `number`          | 100     |
| disabled              | 是否禁用                                                                                                 | `boolean`         | false   |
| step                  | 步长                                                                                                     | `number`          | 1       |
| show-input            | whether to display an input box, works when `range` is false                                             | `boolean`         | false   |
| show-input-controls   | whether to display control buttons when `show-input` is true                                             | `boolean`         | true    |
| size                  | size of the slider wrapper, will not work in vertical mode                                               | `string`          | default |
| input-size            | size of the input box, when set `size`, the default is the value of `size`                               | `string`          | default |
| show-stops            | whether to display breakpoints                                                                           | `boolean`         | false   |
| show-tooltip          | whether to display tooltip value                                                                         | `boolean`         | true    |
| format-tooltip        | format to display tooltip value                                                                          | `function`        | —       |
| range                 | whether to select a range                                                                                | `boolean`         | false   |
| vertical              | vertical mode                                                                                            | `boolean`         | false   |
| height                | Slider height, required in vertical mode                                                                 | `string`          | —       |
| label                 | label for screen reader                                                                                  | `string`          | —       |
| range-start-label     | when `range` is true, screen reader label for the start of the range                                     | `string`          | —       |
| range-end-label       | when `range` is true, screen reader label for the end of the range                                       | `string`          | —       |
| format-value-text     | format to display the `aria-valuenow` attribute for screen readers                                       | `function`        | —       |
| debounce              | debounce delay when typing, in milliseconds, works when `show-input` is true                             | `number`          | 300     |
| tooltip-class         | custom class name for the tooltip                                                                        | `string`          | —       |
| placement             | position of Tooltip                                                                                      | `PopperPlacement` | top     |
| marks                 | marks, type of key must be `number` and must in closed interval `[min, max]`, each mark can custom style | object            | —       |
| validate-event        | whether to trigger form validation                                                                       | boolean           | true    |

### Events

| 事件名称 | 说明                                               | 类型                    |
| -------- | -------------------------------------------------- | ----------------------- |
| change   | 值改变时触发（使用鼠标拖曳时，只在松开鼠标后触发） | `(val: number) => void` |
| input    | 数据改变时触发（使用鼠标拖曳时，活动过程实时触发） | `(val: number) => void` |
