<!-- 加载 demo 组件 start -->
<script setup>
import demo from './demo.vue'
import demo2 from './demo2.vue'
import demo3 from './demo3.vue'
import demo4 from './demo4.vue'
import demo5 from './demo5.vue'
</script>
<!-- 加载 demo 组件 end -->

<!-- 正文开始 -->

# 图片

图片容器，在保留所有原生 img 的特性下，支持懒加载，自定义占位、加载失败等

## 基础用法

可通过 fit 确定图片如何适应到容器框，同原生 object-fit。

<demo-preview comp-name="Image" demo-name="demo">
  <demo />
</demo-preview>

## 占位符

可通过 slot = placeholder 可自定义占位内容

<demo-preview comp-name="Image" demo-name="demo2">
  <demo2 />
</demo-preview>

## 加载失败

可通过 slot = error 可自定义加载失败内容

<demo-preview comp-name="Image" demo-name="demo3">
  <demo3 />
</demo-preview>

## 懒加载

可通过 lazy 开启懒加载功能， 当图片滚动到可视范围内才会加载。 可通过 scroll-container 来设置滚动容器， 若未定义，则为最近一个 overflow 值为 auto 或 scroll 的父元素。

<demo-preview comp-name="Image" demo-name="demo4">
  <demo4 />
</demo-preview>

## 大图预览

可通过 previewSrcList 开启预览大图的功能。 你可以通过 initial-index 初始化第一张预览图片的位置。 默认初始位置为 0。

<demo-preview comp-name="Image" demo-name="demo5">
  <demo5 />
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
