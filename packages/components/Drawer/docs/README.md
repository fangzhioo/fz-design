<!-- 加载 demo 组件 start -->
<script setup>
import demo from './demo.vue'
import demo2 from './demo2.vue'
</script>
<!-- 加载 demo 组件 end -->

<!-- 正文开始 -->

# 抽屉

弹窗展示内容，比 `Dialog` 拥有更丰富的展示方式。

## 基础用法

<Preview comp-name="Drawer" demo-name="demo">
  <demo />
</Preview>

## 多层嵌套

你可以像 `Dialog` 一样拥有多层嵌套的 `Drawer`，如果你需要在不同图层中多个抽屉，你必须设置 `append-to-body` 属性到 `true`

<Preview comp-name="Drawer" demo-name="demo2">
  <demo2 />
</Preview>

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
