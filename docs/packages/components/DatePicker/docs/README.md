<!-- 加载 demo 组件 start -->
<script setup>
import demo from './demo.vue'
import demo2 from './demo2.vue'
import demo3 from './demo3.vue'
import demo4 from './demo4.vue'
import demo5 from './demo5.vue'
import demo6 from './demo6.vue'
</script>
<!-- 加载 demo 组件 end -->

<!-- 正文开始 -->

# 日期选择器

用于选择或输入日期

## 基础用法

<demo-preview comp-name="DatePicker" demo-name="demo">
  <demo />
</demo-preview>

## 其他日期单位

<demo-preview comp-name="DatePicker" demo-name="demo2">
  <demo2 />
</demo-preview>

## 日期格式

<demo-preview comp-name="DatePicker" demo-name="demo3">
  <demo3 />
</demo-preview>

## 选择一段时间

可在一个选择器中便捷地选择一个时间范围。在选择日期范围时，默认情况下左右面板会联动。 如果希望两个面板各自独立切换当前月份，可以使用 unlink-panels 属性解除联动。

<demo-preview comp-name="DatePicker" demo-name="demo4">
  <demo4 />
</demo-preview>

## 自定义内容

弹出框的内容是可以自定义的，在插槽内你可以获取到当前单元格的数据

<demo-preview comp-name="DatePicker" demo-name="demo5">
  <demo5 />
</demo-preview>

更详细的数据类型，请查看下表

```ts
interface DateCell {
  column: number;
  customClass: string;
  disabled: boolean;
  end: boolean;
  inRange: boolean;
  row: number;
  selected: Dayjs;
  isCurrent: boolean;
  isSelected: boolean;
  start: boolean;
  text: number;
  timestamp: number;
  date: Date;
  dayjs: Dayjs;
  type: 'normal' | 'today' | 'week' | 'next-month' | 'prev-month';
}
```

## 日期时间选择器

设置 type 为 datetimerange 即可选择日期和时间范围。 快捷方式的使用方法与 Date Picker 相同。

<demo-preview comp-name="DatePicker" demo-name="demo6">
  <demo6 />
</demo-preview>

## 属性

|  参数  |    说明    |  类型  | 可选值 |  默认值   | 是否必填 |
| :----: | :--------: | :----: | :----: | :-------: | :------: |
| `arg1` | 第一个参数 | string |   -    | `default` |    否    |
| `arg2` | 第二个参数 | string |   -    | `default` |    否    |

## 事件

|    事件名     |    说明    | 参数列表  |            参数说明             |
| :-----------: | :--------: | :-------: | :-----------------------------: |
|    `click`    |  点击事件  |  $event   |        原生的 dom event         |
| `customEvent` | 自定义事件 | [a, b, c] | a：参数一；b：参数二；c：参数三 |

## 方法

|  方法名  |   说明   | 参数列表 | 参数说明 |
| :------: | :------: | :------: | :------: |
| `update` | 手动更新 |    -     |    -     |

## 插槽

|  插槽名   |      说明      |
| :-------: | :------------: |
| `default` | 自定义默认内容 |
