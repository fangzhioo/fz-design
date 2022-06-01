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

# 滑块

通过拖动滑块在一个固定区间内进行选择

## 基础用法

<demo-preview comp-name="Slider" demo-name="demo">
  <demo />
</demo-preview>

## 离散值

选项可以是离散的，改变`step`的值可以改变步长， 通过设置 `show-stops` 属性可以显示间断点

<demo-preview comp-name="Slider" demo-name="demo2">
  <demo2 />
</demo-preview>

## 带有输入框的滑块

通过输入框设置精确数值，设置 show-input 属性会在右侧显示一个输入框。

<demo-preview comp-name="Slider" demo-name="demo3">
  <demo3 />
</demo-preview>

## 范围选择

支持选择某一数值范围，配置 range 属性以激活范围选择模式，该属性的绑定值是一个数组，由最小边界值和最大边界值组成。

<demo-preview comp-name="Slider" demo-name="demo4">
  <demo4 />
</demo-preview>

## 垂直模式

配置 vertical 属性为 true 启用垂直模式。 在垂直模式下，必须设置 height 属性。

<demo-preview comp-name="Slider" demo-name="demo5">
  <demo5 />
</demo-preview>

## 显示标记

设置 marks 属性可以在滑块上显示标记。

<demo-preview comp-name="Slider" demo-name="demo6">
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
