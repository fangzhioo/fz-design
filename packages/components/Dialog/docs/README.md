<!-- 加载 demo 组件 start -->
<script setup>
import demo from './demo.vue'
import demo2 from './demo2.vue'
import demo3 from './demo3.vue'
</script>
<!-- 加载 demo 组件 end -->

<!-- 正文开始 -->

# 对话框

在保留当前页面状态的情况下，告知用户并承载相关操作。

## 基础用法

<demo-preview comp-name="Dialog" demo-name="demo">
  <demo />
</demo-preview>

## 嵌套

如果需要在一个 Dialog 内部嵌套另一个 Dialog，需要使用 `append-to-body` 属性。

通常我们不建议使用嵌套对话框。 如果你需要在页面上呈现多个对话框，你可以简单地平整它们，呈现一个平级关系。 如果你必须在另一个对话框内排出对话框，将嵌套对话框的 `append-to-body` 设置为真 true。 并且它将附加到正文而不是其亲节点，所以两个对话框都可以被正确渲染。

<demo-preview comp-name="Dialog" demo-name="demo2">
  <demo2 />
</demo-preview>

## 可拖拽

设置 `draggable` 属性为 true 来拖拽弹窗

<demo-preview comp-name="Dialog" demo-name="demo3">
  <demo3 />
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
