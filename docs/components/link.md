# Link 链接

超链接组件，基于原生 a 标签定制。

## 基本用法

可以设置 `type` ，来展示不同的样式。支持原生的 `href` 属性。

::: demo

link/basic

:::

## Attributes

| 参数        | 说明       | 类型    | 可选值                                                   | 默认值    |
| ----------- | ---------- | ------- | -------------------------------------------------------- | --------- |
| `type`      | 类型       | string  | `default`/`primary`/`success`、`warning`/`danger`/`info` | `default` |
| `underline` | 是否下划线 | boolean | `true`/`false`                                           | `true`    |
| `disabled`  | 是否禁用   | boolean | `true`/`false`                                           | `false`   |
| `href`      | 链接地址   | string  | -                                                        | -         |
| `icon`      | 图标       | SvgIcon | -                                                        | -         |

## Slots

| 名称      | 说明      |
| --------- | --------- |
| `default` | 默认 slot |
| `icon`    | 图标      |

## Events

| 事件名称 | 说明     | 回调参数   |
| -------- | -------- | ---------- |
| `click`  | 点击链接 | MouseEvent |
