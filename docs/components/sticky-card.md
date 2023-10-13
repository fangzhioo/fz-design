# StickyCard 折叠卡片

折叠卡片

## 基本使用

`open` 可以控制卡片是否展开

::: demo

<template #source>
<fz-sticky-card :open="open1">

  <h1>Hello World！</h1>
  <h1>Hello World！</h1>
  <h1>Hello World！</h1>
  <h1>Hello World！</h1>
  <h1>Hello World！</h1>
  <h1>Hello World！</h1>
  <h1>Hello World！</h1>
  <h1>Hello World！</h1>
</fz-sticky-card>
</template>

```html
<script lang="ts" setup>
  import { ref } from 'vue'

  const open1 = ref(false)
</script>

<template>
  <fz-sticky-card :open="open1">
    <h1>Hello World！</h1>
    <h1>Hello World！</h1>
    <h1>Hello World！</h1>
    <h1>Hello World！</h1>
    <h1>Hello World！</h1>
    <h1>Hello World！</h1>
    <h1>Hello World！</h1>
    <h1>Hello World！</h1>
  </fz-sticky-card>
</template>
```

:::

## 来源内容

`source` 插槽可以插入来源内容

::: demo

<template #source>
<fz-sticky-card :open="open2">

<template #source>

<h1>你好世界！</h1>
<h1>你好世界！</h1>
<h1>你好世界！</h1>
</template>

  <h1>Hello World！</h1>
  <h1>Hello World！</h1>
  <h1>Hello World！</h1>
  <h1>Hello World！</h1>
  <h1>Hello World！</h1>
  <h1>Hello World！</h1>
  <h1>Hello World！</h1>
  <h1>Hello World！</h1>
</fz-sticky-card>
</template>

```html
<template>
  <fz-sticky-card :open="open2">
    <template #source>
      <h1>你好世界！</h1>
      <h1>你好世界！</h1>
      <h1>你好世界！</h1>
    </template>

    <h1>Hello World！</h1>
    <h1>Hello World！</h1>
    <h1>Hello World！</h1>
    <h1>Hello World！</h1>
    <h1>Hello World！</h1>
    <h1>Hello World！</h1>
    <h1>Hello World！</h1>
    <h1>Hello World！</h1>
  </fz-sticky-card>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'

  const open2 = ref(false)
</script>
```

:::

## Attributes

| 参数           | 说明               | 类型    | 可选值 | 默认值 |
| -------------- | ------------------ | ------- | ------ | ------ |
| `open`         | 是否展开           | boolean | ——     | false  |
| `open-text`    | 操作栏展开时的文字 | string  | ——     | 关闭   |
| `close-text`   | 操作栏关闭时的文字 | string  | ——     | 开启   |
| `border-color` | 自定义边框颜色     | string  | ——     | ——     |

## Events

| 事件名  | 说明       | 参数列表 | 参数说明 |
| ------ | --------- | ------- | ------- |
| `open`  | 展开时触发 | $event   | true     |
| `close` | 关闭时触发 | $event   | false    |

## Slots

| 名称      | 说明         |
| --------- | ------------ |
| `default` | 默认折叠内容 |
| `source`  | 来源内容     |

## Interface

组件导出以下类型定义：

```ts
import type { StickyCardInstance, StickyCardProps } from 'fz-design'
```

<script setup lang="ts">
  import { ref } from 'vue'

  const open1 = ref(false)
  const open2 = ref(false)
</script>
