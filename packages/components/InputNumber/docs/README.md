<!-- 加载 demo 组件 start -->
<script setup>
import demo from './demo.vue'
import demo2 from './demo2.vue'
import demo3 from './demo3.vue'
import demo4 from './demo4.vue'
</script>
<!-- 加载 demo 组件 end -->

<!-- 正文开始 -->

# 数字输入框

仅允许输入标准的数字值，可定义范围

## 基础用法

<demo-preview comp-name="InputNumber" demo-name="demo">
  <demo />
</demo-preview>

## 步进

允许定义递增递减的步进控制,设置 `step` 属性可以控制步长。 也可以设置 `step-strictly` 属性接受一个 Boolean，来严格按照步进。 如果这个属性被设置为 true，则只能输入步进的倍数。设置 `precision` 属性可以控制数值精度，接收一个 `Number`。

<demo-preview comp-name="InputNumber" demo-name="demo2">
  <demo2 />
</demo-preview>

## 按钮位置

设置 `controls-position` 属性可以控制按钮位置。

<demo-preview comp-name="InputNumber" demo-name="demo3">
  <demo3 />
</demo-preview>

## 尺寸

使用 `size` 属性改变输入框大小。 除了默认大小外，还有另外选项： `large`, `small`, `mini`。

<demo-preview comp-name="InputNumber" demo-name="demo4">
  <demo4 />
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
