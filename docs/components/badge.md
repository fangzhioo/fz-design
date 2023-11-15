# Badge 徽章

按钮和图标上的数字或状态标记。

## 基本用法

可以用来展示新消息的数量。

:::demo 数量值可接受 `Number` 或 `String`。

badge/basic

:::

## 类型

可以设置不同的类型

:::demo 通过设置 `type` 属性，来设置不同的类型

badge/type

:::


## 最大值

你还可以自定义最大值

:::demo 由 `max` 属性定义，接受 `Number` 值。 请注意，仅在值也是 `Number` 时起作用。

badge/max

:::

## 自定义显示内容

你也可以展示除数字以外你想要展示的任何值。

:::demo 当 `value` 是 `String` 时，可以显示自定义文字。

badge/customize

:::

## 省略点

通过一个小红点标记来告知用户有新内容。

:::demo 使用 `dot` 属性。 是个布尔值。

badge/dot

:::

## API

### Attributes

| 参数   | 说明                                                                | 类型                                                        | 默认值 |
| ------ | ------------------------------------------------------------------- | ----------------------------------------------------------- | ------ |
| value  | 显示值                                                              | `string \| number`                                          | ''     |
| max    | 最大值，超过最大值会显示 `{max}+`。 只有当 value 是数字类型时起作用 | `number`                                                    | 99     |
| dot    | 是否显示小圆点                                                      | `boolean`                                                   | false  |
| hidden | 是否隐藏 Badge                                                      | `boolean`                                                   | false  |
| type   | 类型                                                                | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | danger |

### Slots

| 名称    | 说明       |
| ------- | ---------- |
| default | 自定义内容 |
