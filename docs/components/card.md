# Card 卡片

将信息聚合在卡片容器中展示。

## 基本用法

卡片包含标题，内容以及操作区域。

Card 组件由 `header` 和 `body` 组成。 `header` 是可选的，其内容取决于一个具名的 slot。

::: demo

<template #source>
  <fz-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>Card name</span>
        <fz-button class="button" text>Operation button</fz-button>
      </div>
    </template>
    <div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</div>
  </fz-card>
</template>

```html
<template>
  <fz-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>Card name</span>
        <fz-button class="button" text>Operation button</fz-button>
      </div>
    </template>
    <div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</div>
  </fz-card>
</template>

<style>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 480px;
}
</style>

```
:::

## Attributes

| 参数  | 说明 | 类型 | 可选值 | 默认值 |
| ----- | ---- | ---- | ------ | ------ |
| `xxx` | xxx  | xxx  | `xxx`  | xxx    |

## Slots

| 名称  | 说明 |
| ----- | ---- |
| `xxx` | xxx  |

## Events

| 事件名称 | 说明 | 回调参数 |
| -------- | ---- | -------- |
| `xxx`    | xxx  | xxx      |


<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 480px;
}
</style>