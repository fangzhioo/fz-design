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

# 富文本编辑器

用于编辑丰富的文本内容编辑器，基于[tiptap 编辑器](https://tiptap.dev/)构建。**支持 markdown** 的方式编写。

## 基础用法

<demo-preview comp-name="RichEditor" demo-name="demo">
  <demo />
</demo-preview>

## 表格插入

<demo-preview comp-name="RichEditor" demo-name="demo2">
  <demo2 />
</demo-preview>

## 自定义图片上传逻辑

<demo-preview comp-name="RichEditor" demo-name="demo3">
  <demo3 />
</demo-preview>

## 自定义拓展

比如这里添加一个拓展[@tiptap/extension-placeholder](https://tiptap.dev/api/extensions/placeholder) ，为编辑器添加 placeholder。别忘了添加 css！！

<demo-preview comp-name="RichEditor" demo-name="demo4">
  <demo4 />
</demo-preview>

## 自定义菜单

使用 `slot="menus"` 插槽，自定义菜单功能和样式。

<demo-preview comp-name="RichEditor" demo-name="demo5">
  <demo5 />
</demo-preview>

你可完全定制自己的拓展和菜单。

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
