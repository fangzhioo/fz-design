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

# 选择器

下拉菜单展示更多内容并选择

## 基础用法

<Preview comp-name="Select" demo-name="demo">
  <demo />
</Preview>

## 选项禁用、组件禁用、可清除

在 `fz-option` 中，设定 `disabled` 值为 `true`，即可禁用该选项；为 `fz-select` 设置 `disabled`属性，则整个选择器不可用。包含清空按钮，可将选择器清空为初始状态，为 `fz-select` 设置 `clearable` 属性，则可将选择器清空。 需要注意的是，`clearable` 属性仅适用于单选。

<Preview comp-name="Select" demo-name="demo2">
  <demo2 />
</Preview>

## 多选

适用性较广的基础多选，用 `Tag` 展示已选项

为 `fz-select` 设置 `multiple` 属性即可启用多选， 此时 `v-model` 的值为当前选中值所组成的数组。 默认情况下选中值会以 `Tag` 的形式展现， 你也可以设置 `collapse-tags` 属性将它们合并为一段文字。

<Preview comp-name="Select" demo-name="demo3">
  <demo3 />
</Preview>

## 自定义模板

你可以自定义单个选项怎么被渲染，将自定义的 HTML 模板插入 `fz-option` 的 `slot` 中即可。

<Preview comp-name="Select" demo-name="demo4">
  <demo4 />
</Preview>

## 将选项分组

你可以为选项进行分组来区分不同的选项，使用 `fz-option-group` 对备选项进行分组，它的 `label` 属性为分组名。

<Preview comp-name="Select" demo-name="demo5">
  <demo5 />
</Preview>

## 筛选选项和远程搜索

可以利用筛选功能快速查找选项

为 `fz-select` 添加 `filterable` 属性即可启用筛选功能。 默认情况下，Select 会找出所有 label 属性包含输入值的选项。 如果希望使用其他的搜索逻辑，可以通过传入一个 `filter-method` 来实现。 `filter-method` 为一个 Function，它会在输入值发生变化时调用，参数为当前输入值。

通过输入关键字在服务器上来搜索数据

为了启用远程搜索，需要将 `filterable` 和 `remote` 设置为 `true`，同时传入一个 `remote-method`。 `remote-method` 为一个 Function，它会在输入值发生变化时调用，参数为当前输入值。 需要注意的是，如果 `fz-option` 是通过 v-for 指令渲染出来的，此时需要为 `fz-option` 添加 key 属性， 且其值需具有唯一性，比如这个例子中的 item.value。

<Preview comp-name="Select" demo-name="demo6">
  <demo6 />
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
