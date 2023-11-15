# StickyCard 折叠卡片

折叠卡片

## 基本使用

`open` 可以控制卡片是否展开

::: demo

sticky-card/basic

:::

## 来源内容

`source` 插槽可以插入来源内容

::: demo

sticky-card/slot-source

:::

## API

### Attributes

| 参数           | 说明               | 类型    | 默认值 |
| -------------- | ------------------ | ------- | ------ | 
| `open`         | 是否展开           | boolean | ——     | false |
| `open-text`    | 操作栏展开时的文字 | string  | ——     | 关闭  |
| `close-text`   | 操作栏关闭时的文字 | string  | ——     | 开启  |
| `border-color` | 自定义边框颜色     | string  | ——     | ——    |

### Events

| 事件名  | 说明       | 参数列表 | 参数说明 |
| ------- | ---------- | -------- | -------- |
| `open`  | 展开时触发 | $event   | true     |
| `close` | 关闭时触发 | $event   | false    |

### Slots

| 名称      | 说明         |
| --------- | ------------ |
| `default` | 默认折叠内容 |
| `source`  | 来源内容     |

### Interface

组件导出以下类型定义：

```ts
import type { StickyCardInstance, StickyCardProps } from 'fz-design'
```
