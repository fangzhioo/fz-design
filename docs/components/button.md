# 按钮

按钮

## 基础用法

`type` 属性可以配置不同的主题类型，展示不同的颜色状态

::: demo

<template #source>
  <div>
    <fz-button >default</fz-button>
    <fz-button type="primary" >primary</fz-button>
    <fz-button type="success" >success</fz-button>
    <fz-button type="warning" >warning</fz-button>
    <fz-button type="info" >info</fz-button>
    <fz-button type="error" >error</fz-button>
    <fz-button type="text" >text</fz-button>
  </div>
</template>

```html
<template>
  <div>
    <fz-button>default</fz-button>
    <fz-button type="primary">primary</fz-button>
    <fz-button type="success">success</fz-button>
    <fz-button type="warning">warning</fz-button>
    <fz-button type="info">info</fz-button>
    <fz-button type="error">error</fz-button>
    <fz-button type="text">text</fz-button>
  </div>
</template>
```

:::

## 加载状态

`loading` 属性可以控制加载状态。

::: demo

<template #source>
  <div>
    <fz-button type="primary" loading>primary</fz-button>
  </div>
</template>

```html
<template>
  <div>
    <fz-button type="primary" loading>primary</fz-button>
  </div>
</template>
```

:::

## 尺寸

使用 `size` 属性设置按钮的尺寸大小。

::: demo

<template #source>

  <div>
    <fz-button size="mini" >mini</fz-button>
    <fz-button size="small" >small</fz-button>
    <fz-button size="medium" >medium</fz-button>
    <fz-button size="large" >large</fz-button>
  </div>
</template>

```html
<div>
  <fz-button size="mini">mini</fz-button>
  <fz-button size="small">small</fz-button>
  <fz-button size="medium">medium</fz-button>
  <fz-button size="large">large</fz-button>
</div>
```

:::

## 按钮组

::: demo

<template #source>

  <div>
    <fz-button-group>
      <fz-button>北京</fz-button>
      <fz-button>上海</fz-button>
      <fz-button>杭州</fz-button>
    </fz-button-group>
  </div>
</template>

```html
<div>
  <fz-button-group>
    <fz-button>北京</fz-button>
    <fz-button>上海</fz-button>
    <fz-button>杭州</fz-button>
  </fz-button-group>
</div>
```

:::

## Attributes

| 参数   | 说明 | 类型   | 可选值 | 默认值    | 是否必填 |
| ------ | ---- | ------ | ------ | --------- | -------- |
| `type` | 类型 | string | -      | `default` | 否       |
| `size` | 尺寸 | string | -      | `default` | 否       |

## Events

| 事件名  | 说明     | 参数列表 | 参数说明         |
| ------- | -------- | -------- | ---------------- |
| `click` | 点击事件 | $event   | 原生的 dom event |

## Interface

组件导出以下类型定义：

```ts
import type { ButtonInstance, ButtonProps, ButtonType, ButtonSize } from 'fz-design'
```

## 样式变量

组件提供了下列 CSS 变量，可用于自定义样式

| 名称                     | 描述         |
| ------------------------ | ------------ |
| `--fz-button-bg-color`   | 按钮背景色   |
| `--fz-button-text-color` | 按钮文字颜色 |
| `...`                    | ...          |
