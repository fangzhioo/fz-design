# Calendar 日历

可以查看还有多少天过年

:::danger

🚧 当前组件处于开发阶段，文档更新频繁，尚不稳定，谨慎使用。

:::

## 基本用法

通过 `v-model:date` 需要绑定一个日期对象。

:::demo

calendar/basic

:::

## 显示农历

`lunar` 可以配置显示农历的日历

:::demo

calendar/lunar

:::

## 边框

`border` 可以设置是否显示边框，默认 `false`。

:::demo

calendar/border

:::

## 隐藏头部

`hidden-header` 可以隐藏头部内容，默认 `false`。

:::demo

calendar/header

:::

::: tip

组件仅支持 `1900 - 2100` 年之间的日期选择。

:::

## Attributes

| 参数             | 说明                                     | 类型               | 默认值 |
| ---------------- | ---------------------------------------- | ------------------ | ------ |
| v-model:date     | 绑定日期                                 | `date`             | Date   |
| lunar            | 是否显示农历或节日，仅支持 `1900 ~ 2100` | `boolean`          | false  |
| hidden-header    | 是否隐藏头部                             | `boolean`          | false  |
| border           | 是否显示边框                             | `boolean`          | false  |
| border-color     | 自定义边框颜色                           | `string`           | ——     |
| day-cell-height  | 日期单元格高度                           | `string \| number` | ——     |
| week-cell-height | 星期单元格高度                           | `string \| number` | ——     |

## Slots

| 名称        | 说明                 |
| ----------- | -------------------- |
| last-change | 自定义上个月切换按钮 |
| now-change  | 自定义今天切换按钮   |
| next-change | 自定义下个月切换按钮 |

## Events

| 事件名称 | 说明       | 类型                                                  |
| -------- | ---------- | ----------------------------------------------------- |
| change   | 改变时触发 | `(year: number, month: number, date: number) => void` |
