<!-- 加载 demo 组件 start -->
<script setup>
import demo from './demo.vue'
import demo2 from './demo2.vue'
import demo3 from './demo3.vue'
</script>
<!-- 加载 demo 组件 end -->

<!-- 正文开始 -->

# 固钉

将页面元素固定在特定可视区域

## 基础用法

固钉默认固定在页面顶部。

通过设置 `offset` 属性来改变吸顶距离，默认值为 0。

<Preview comp-name="Affix" demo-name="demo">
  <demo />
</Preview>

## 为 Affix 组件指定容器

通过设置 `target` 属性，让固钉始终保持在容器内， 超过范围则隐藏。

请注意容器避免出现滚动条。

<Preview comp-name="Affix" demo-name="demo2">
  <demo2 />
</Preview>

## 固定 Affix 组件的位置

Affix 组件提供 2 个固定的位置参数 `top` 和 `bottom。`

通过设置 `position` 属性来改变固定位置，默认值为 `top` 。

<Preview comp-name="Affix" demo-name="demo3">
  <demo3 />
</Preview>

## 属性

|    参数    |          说明          |     类型      |    可选值    | 默认值 | 是否必填 |
| :--------: | :--------------------: | :-----------: | :----------: | :----: | :------: |
|  `offset`  |        偏移距离        |    number     |      -       |   0    |    否    |
| `position` |        固钉位置        |    string     | `top/bottom` | `top`  |    否    |
|  `target`  | 指定容器（CSS 选择器） |    string     |      -       |   -    |    否    |
| `z-index`  |        固钉层级        | string/number |      -       |  100   |    否    |

## 事件

|  事件名  |           说明           |           参数列表            |              参数说明              |
| :------: | :----------------------: | :---------------------------: | :--------------------------------: |
| `change` | 固钉状态改变时触发的事件 |       [value: boolean]        |              是否改变              |
| `scroll` |     滚动时触发的事件     | [top: number, fixed: boolean] | top：scroll top；fixed：fixed 状态 |

## 方法

|  方法名  |       说明       | 参数列表 | 参数说明 |
| :------: | :--------------: | :------: | :------: |
| `update` | 手动更新固钉状态 |    -     |    -     |

## 插槽

|  插槽名   |      说明      |
| :-------: | :------------: |
| `default` | 自定义默认内容 |
