<!-- 加载 demo 组件 start -->
<script setup>
import demo from './demo.vue'
import demo2 from './demo2.vue'
import demo3 from './demo3.vue'
</script>
<!-- 加载 demo 组件 end -->

<!-- 正文开始 -->

# Button

Commonly used button.

## Basic usage

<Preview comp-name="Button" demo-name="demo">
  <demo />
</Preview>

## Advanced

Use icons to add more meaning to Button. You can use icon alone to save some space, or use it with text.

Click the button to load data, then the button displays a loading state.

Besides default size, Button component provides three additional sizes for you to choose among different scenarios.

<Preview comp-name="Button" demo-name="demo2">
  <demo2 />
</Preview>

## Button Group

Displayed as a button group, can be used to group a series of similar operations.

Use tag `<el-button-group>` to group your buttons.

<Preview comp-name="Button" demo-name="demo3">
  <demo3 />
</Preview>

## Button Attributes

|  参数  |    说明    |  类型  | 可选值 |  默认值   | 是否必填 |
| :----: | :--------: | :----: | :----: | :-------: | :------: |
| `arg1` | 第一个参数 | string |   -    | `default` |    否    |
| `arg2` | 第二个参数 | string |   -    | `default` |    否    |

## Events

|    事件名     |    说明    | 参数列表  |            参数说明             |
| :-----------: | :--------: | :-------: | :-----------------------------: |
|    `click`    |  点击事件  |  $event   |        原生的 dom event         |
| `customEvent` | 自定义事件 | [a, b, c] | a：参数一；b：参数二；c：参数三 |
