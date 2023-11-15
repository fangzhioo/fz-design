# Radio 单选

单选和单选组

## 基本用法

和原生保持一致，通过 `name` 绑定同一组选项。可以设置 `disabled` 来禁用选项。

:::demo

radio/basic

:::

## 尺寸

可以通过设置 `size` 属性，来设置不同的大小，可设置的值有：`small`、`default`、`large`。

:::demo

radio/size

:::

## 按钮组

需要使用 `v-model` 绑定一个值。

:::tip

`disabled` 属性可以禁用指定选项，作用在 `fz-radio-group` 组件上可以全部禁用，作用在 `fz-radio` 上可以指定禁用某一项。

:::

:::demo

radio/group-basic

:::

## 按钮组尺寸

`size` 属性可以配置不同的尺寸。

:::demo

radio/group-size

:::

## 背景色效果

`background` 属性可以配置带有背景色的效果。

:::demo

radio/group-background

:::

## 垂直排列

`vertical` 属性可以垂直排列。

:::demo

radio/group-vertical

:::

## Radio API

### API

### Attributes

| 参数        | 说明         | 类型              | 默认值 |
| ----------- | ------------ | ----------------- | ------ |
| model-value | 绑定值       | `RadioModelValue` | null   |
| size        | 尺寸         | `RadioSize`       | -      |
| name        | 原生 name    | `string`          | -      |
| label       | 选框对应的值 | `RadioModelValue` | -      |
| disabled    | 是否禁用     | `boolean`         | -      |

#### Slots

| 名称    | 说明                       |
| ------- | -------------------------- |
| default | 展示的内容，默认为 `label` |

#### Events

| 事件名称 | 说明       | 类型                             |
| -------- | ---------- | -------------------------------- |
| change   | 改变时触发 | `(val: RadioModelValue) => void` |

#### Interface

组件导出以下类型定义：

```ts
import type {
  RadioInstance,
  RadioProps,
  RadioSize,
  RadioModelValue
} from 'fighting-design'
```

## RadioGroup API

### API

### Attributes

| 参数        | 说明           | 类型              | 默认值 |
| ----------- | -------------- | ----------------- | ------ |
| model-value | 绑定值         | `RadioModelValue` | null   |
| size        | 尺寸           | `RadioSize`       | -      |
| vertical    | 是否纵向排列   | `boolean`         | -      |
| background  | 背景状态       | `boolean`         | -      |
| disabled    | 是否禁用       | `boolean`         | -      |
| columnGap   | 横向排列的间距 | `string\|number`  | -      |
| rowGap      | 纵向排列的间距 | `string\|number`  | -      |

#### Slots

| 名称    | 说明       |
| ------- | ---------- |
| default | Radio 组件 |

#### Events

| 事件名称 | 说明       | 类型                             |
| -------- | ---------- | -------------------------------- |
| change   | 改变时触发 | `(val: RadioModelValue) => void` |

#### Interface

组件导出以下类型定义：

```ts
import type { RadioGroupInstance, RadioGroupProps } from 'fighting-design'
```
