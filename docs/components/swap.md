# Swap 切换

切换状态的组件

## 基本用法

需要使用 `v-model` 绑定一个值。

::: demo

swap/basic

:::

## 大小

`size` 属性可配置不同的尺寸

::: demo

swap/size

:::

## 自定义图标

`icon-on` 和 `icon-off` 分别控制切换的不同图标。

::: demo

swap/icon

:::

## 动画

`type` 属性可以配置不同的动画类型

::: demo

swap/type

:::

## Attributes

| 参数     | 说明           | 类型                | 默认值 |
| -------- | -------------- | ------------------- | ------ |
| v-model  | 绑定值         | `boolean`           | false  |
| size     | 组件尺寸       | `string` / `number` | -      |
| type     | 动画类型       | SwapType            | -      |
| icon-on  | 打开展示的图标 | IconSlotType        | -      |
| icon-off | 关闭展示的图标 | IconSlotType        | -      |

## Interface

组件导出以下类型定义：

```ts
import type { SwapInstance, SwapProps, SwapType } from 'fighting-design'
```

## Events

| 事件名称 | 说明       | 类型                                        |
| -------- | ---------- | ------------------------------------------- |
| `change` | 切换后触发 | `(evt: MouseEvent, value: boolean) => void` |
