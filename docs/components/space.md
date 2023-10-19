# Space 间距

虽然我们拥有 [Divider 组件](https://fangzhioo.github.io/fz-design/components/divider.html)，但很多时候我们需要不是一个被 Divider 组件 分割开的页面结构，因此我们会重复的使用很多的 Divider 组件，这在我们的开发效率上造成了一定的困扰。 间距组件就是为了解决这种困扰应运而生的。

## 基本用法

最基础的用法，通过这个组件来给组件之间提供统一的间距。

:::demo 通过间距组件来给多个组件之间提供间距

space/basic

:::

## 垂直布局

使用 `direction` 来控制布局的方式, 背后实际上是利用了 `flex-direction` 来控制.

:::demo

space/vertical-layout

:::

## 控制间距

通过调整 `size` 的值来控制间距的大小

使用内置的 `small`、`default`、`large` 来设置间距大小，分别对应 8px、12px 和 16px 的间距。 默认的间距大小为 `small`，也就是 8px。

:::demo

space/control-size

:::

## 自定义间距

很多时候，内建的大小不满足设计师的要求，我们可以通过传入自己定义的大小 (数值类型) 来设置。

:::demo

space/customized-size

:::

::: tip

不要让 `FzSpace` 与使用依赖父元素百分比宽度（或高度）的元素一起使用（例如 FzSlider），这样会造成光标不同步。

:::

## 自动换行

在 **水平（horizontal）** 模式下，使用 `wrap` 属性来控制是否自动换行。

:::demo

space/auto-wrapping

:::

## 分隔符

有时候，仅仅在行间加空白并不能满足我们的日常需求，此时分隔符 (spacer) 就可以发挥非常好的作用了。

### 字母数字类型分隔符

:::demo

space/literal-type-spacer

:::

### VNode 类型分隔符

:::demo

space/vnode-type-spacer

:::

## 对齐方式

设置该值可以调整所有子节点在容器内的对齐方式，可设置的值与 [align-items](https://developer.mozilla.org/en-US/docs/Web/CSS/align-items) 一致。

:::demo

space/alignment

:::

## 填充容器

通过 `fill` **（布尔类型）**参数，您可以控制子节点是否自动填充容器。

:::demo

space/fill

:::

也可以使用 `fillRatio` 参数，自定义填充的比例， 默认值为 100，代表基于父容器宽度的 100% 进行填充

需要注意的是，水平布局和垂直布局的表现形式稍有不同，具体的效果可以查看下面的例子

用 `fillRatio` 自定义填充比例

:::demo

space/fill-ratio

:::

## Attributes

| 参数       | 说明                      | 类型                                                                        | 默认值     |
| ---------- | ------------------------- | --------------------------------------------------------------------------- | ---------- | 
| alignment  | 对齐方式                  | [align-items](https://developer.mozilla.org/en-US/docs/Web/CSS/align-items) | center       |
| class      | 样式类名                  | `string` / `object` / `array`                                               | —            |
| direction  | 排列方向                  | `'vertical' \| 'horizontal'`                                                | horizontal   |
| prefixCls  | 给 space-items 的类名前缀 | `string`                                                                    | —            |
| style      | 额外样式                  | `CSSProperties \| CSSProperties[] \| string[]`                              | —            |
| spacer     | 分隔符                    | `string` / `number` / `VNode`                                               | —            |
| size       | 间隔大小                  | `'default' \| 'small' \| 'large'`/ `number` / `[number, number]`            | small        |
| wrap       | 自动换行                  | `boolean`                                                                   | false        |
| fill       | 子元素是否填充            | `boolean`                                                                   | false        |
| fill-ratio | 填充比例                  | `number`                                                                    | 100          |

## Slots

| 名称      | 说明               |
| --------- | ------------------ |
| `default` | 需要添加间隔的元素 |
