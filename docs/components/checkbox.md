# Checkbox 多选框

多选框

## 基本用法

绑定单个复选框，配合 `v-model` 绑定一个 `boolean` 值。

:::demo

checkbox/basic

:::

## 尺寸

可以通过设置 `size` 属性，来设置不同的大小，可设置的值有：`small`、`default`、`large`。

:::demo

checkbox/size

:::

## 多选框组

需要使用 `v-model` 绑定一个值。

:::tip

`disabled` 属性可以禁用指定选项，作用在 `fz-checkbox-group` 组件上可以全部禁用，作用在 `fz-checkbox` 上可以指定禁用某一项。

:::

:::demo

checkbox/group-basic

:::

## 按钮组尺寸

`size` 属性可以配置不同的尺寸。

:::demo

checkbox/group-size

:::

## 背景色效果

`background` 属性可以配置带有背景色的效果。

:::demo

checkbox/group-background

:::

## 垂直排列

`vertical` 属性可以垂直排列。

:::demo

checkbox/group-vertical

:::

## Checkbox API

### API

### Attributes

| 参数        | 说明         | 类型                 | 默认值 |
| ----------- | ------------ | -------------------- | ------ |
| model-value | 绑定值       | `CheckboxModelValue` | null   |
| size        | 尺寸         | `CheckboxSize`       | -      |
| name        | 原生 name    | `string`             | -      |
| label       | 选框对应的值 | `CheckboxModelValue` | -      |
| disabled    | 是否禁用     | `boolean`            | -      |

#### Slots

| 名称    | 说明                       |
| ------- | -------------------------- |
| default | 展示的内容，默认为 `label` |

#### Events

| 事件名称 | 说明       | 类型                                |
| -------- | ---------- | ----------------------------------- |
| change   | 改变时触发 | `(val: CheckboxModelValue) => void` |

#### Interface

组件导出以下类型定义：

```ts
import type {
  CheckboxInstance,
  CheckboxProps,
  CheckboxSize,
  CheckboxModelValue,
  CheckboxLabel
} from 'fighting-design'
```

## CheckboxGroup API

### API

### Attributes

| 参数        | 说明           | 类型              | 默认值 |
| ----------- | -------------- | ----------------- | ------ |
| model-value | 绑定值         | `CheckboxLabel[]` | null   |
| size        | 尺寸           | `CheckboxSize`    | -      |
| vertical    | 是否纵向排列   | `boolean`         | -      |
| background  | 背景状态       | `boolean`         | -      |
| disabled    | 是否禁用       | `boolean`         | -      |
| columnGap   | 横向排列的间距 | `string\|number`  | -      |
| rowGap      | 纵向排列的间距 | `string\|number`  | -      |

#### Slots

| 名称    | 说明          |
| ------- | ------------- |
| default | Checkbox 组件 |

#### Events

| 事件名称 | 说明       | 类型                                |
| -------- | ---------- | ----------------------------------- |
| change   | 改变时触发 | `(val: CheckboxLabel[]) => void` |

#### Interface

组件导出以下类型定义：

```ts
import type { CheckboxGroupInstance, CheckboxGroupProps } from 'fighting-design'
```
