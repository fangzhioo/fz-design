# Message 消息

用于主动操作后的反馈提示

## 基本用法

:::demo

message/basic

:::

## 多种类型

:::demo

message/type

:::

## 自定义消息

`message` 属性可接收 `string` 显示文本，也可接收 `VNode` 自定义消息

限定最大宽度为 `500px`

:::demo

message/custom-content

:::

## 可关闭

可以添加关闭按钮。

默认的 `Message` 是不可以被人工关闭的。 如果你需要手动关闭功能，你可以把 `close` 设置为 `true`。

此外，`Message` 拥有可控的 duration， 默认的关闭时间为 `2500 毫秒`，当把这个属性的值设置为 0 便表示该消息不会被自动关闭。

可以传递 `close-btn` 属性来自定义关闭按钮，支持字符串与 `VNode`。

:::demo

message/closable

:::

## 不同位置

`placement` 配置项可调整不同弹出位置

:::demo

message/placement

:::

## API

### Attributes

| 参数       | 说明                                         | 类型                                  | 默认值  |
| ---------- | -------------------------------------------- | ------------------------------------- | ------- |
| message    | 消息文本                                     | `string \| VNode`                     | false   |
| type       | 消息类型                                     | `ComponentType`                       | default |
| duration   | 显示时间，单位为毫秒。 设为 0 则不会自动关闭 | `number`                              | 2500    |
| round      | 是否为圆角类型                               | `boolean`                             | false   |
| closable   | 是否可关闭                                   | `boolean`                             | false   |
| icon       | 消息 icon                                    | `IconSlotType`                        | -       |
| color      | 字体颜色                                     | `string`                              | -       |
| placement  | 位置                                         | [MessagePlacement](#messageplacement) | top     |
| offset     | 偏移距离                                     | `number`                              | 20      |
| background | 自定义背景色                                 | `string`                              | -       |
| close-btn  | 关闭按钮                                     | `string \| IconSlotType`              | -       |
| on-close   | 关闭之后的回调                               | `(evt?: MouseEvent) => void`          | -       |

### Interface

组件导出以下类型定义：

```ts
import type { MessageInstance, MessageProps, MessagePlacement } from 'fz-design'
```

### MessagePlacement

```ts
type MessagePlacement =
  | 'top'
  | 'top-left'
  | 'top-right'
  | 'bottom'
  | 'bottom-left'
  | 'bottom-right'
```
