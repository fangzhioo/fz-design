<!-- 加载 demo 组件 start -->
<script setup>
import demo from './demo.vue'
import demo2 from './demo2.vue'
</script>
<!-- 加载 demo 组件 end -->

<!-- 正文开始 -->

# 弹出信息

展示元素隐藏信息浮窗

## 基础用法

<demo-preview comp-name="Popover" demo-name="demo">
  <demo />
</demo-preview>

## 获取对应打开隐藏时机

<demo-preview comp-name="Popover" demo-name="demo2">
  <demo2 />
</demo-preview>

## 属性

|           参数            |                                             说明                                             |     类型      |                                                  可选值                                                   |                         默认值                          | 是否必填 |
| :-----------------------: | :------------------------------------------------------------------------------------------: | :-----------: | :-------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------: | :------: |
|         `trigger`         |                                           触发方式                                           |    string     |                                        `click/hover/focus/manual`                                         |                         `click`                         |    否    |
|          `title`          |                                             标题                                             |    string     |                                                     -                                                     |                            -                            |    否    |
|         `content`         |                            显示的内容，也可以通过 `slot` 传入 DOM                            |    string     |                                                     -                                                     |                            -                            |    否    |
|          `width`          |                                             宽度                                             | string/number |                                                     -                                                     |                     最小宽度 150px                      |    否    |
|        `placement`        |                                           出现位置                                           |    string     | top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end |                            -                            |    否    |
|        `disabled`         |                                           是否可用                                           |    boolean    |                                                     -                                                     |                          false                          |    否    |
| `visible/v-model:visible` |                                           是否显示                                           |    boolean    |                                                     -                                                     |                          false                          |    否    |
|         `offset`          |                                       出现位置的偏移量                                       |    number     |                                                     -                                                     |                            0                            |    否    |
|       `transition`        |                                         定义渐变动画                                         |    string     |                                                     -                                                     |                    fz-fade-in-linear                    |    否    |
|       `show-arrow`        |                                         是否显示箭头                                         |    boolean    |                                                     -                                                     |                          true                           |    否    |
|     `popper-options`      |                      [popper.js](https://popper.js.org/docs/v2/)的参数                       |    object     |                                            查看 popper.js 文档                                            | `{ boundariesElement: 'body', gpuAcceleration: false }` |    否    |
|      `popper-class`       |                                      为 popper 添加类名                                      |    string     |                                                     -                                                     |                            -                            |    否    |
|       `show-after`        |                                      延迟出现，单位毫秒                                      |    number     |                                                     -                                                     |                            0                            |    否    |
|       `hide-after`        |                                      延迟关闭，单位毫秒                                      |    number     |                                                     -                                                     |                           200                           |    否    |
|       `auto-close`        |                  Tooltip 出现后自动隐藏延时，单位毫秒，为 0 则不会自动隐藏                   |    number     |                                                     -                                                     |                            0                            |    否    |
|        `tabindex`         | [tabindex](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex)属性 |    number     |                                                     -                                                     |                            -                            |    否    |

## 事件

|    事件名     |          说明          | 参数列表 | 参数说明 |
| :-----------: | :--------------------: | :------: | :------: |
|    `show`     |       展示时触发       |    -     |    -     |
|    `hide`     |       隐藏时触发       |    -     |    -     |
| `after-enter` | 显示动画播放完毕后触发 |    -     |    -     |
| `after-leave` | 隐藏动画播放完毕后触发 |    -     |    -     |

## 插槽

|   插槽名    |             说明              |
| :---------: | :---------------------------: |
|  `default`  |   Popover 展示的 html 内容    |
| `reference` | 触发 Popover 显示的 HTML 元素 |
