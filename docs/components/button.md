# Button 按钮

基本按钮，提供一些美化的样式。

## 基础用法

`type` 属性可以配置不同的主题类型，展示不同的颜色状态

:::demo 基础用法

button/basic

:::

## 加载状态

`loading` 属性可以控制加载状态。

:::demo

button/loading

:::

## 自定义 Icon

`icon` 属性接受 `@fz-design/fz-design-icon` 提供的图标。

:::demo

button/icon

:::

## 尺寸

使用 `size` 属性设置按钮的尺寸大小。

:::demo

button/size

:::

## 按钮组

:::demo

button/button-group

:::

## Button API

### Attributes

| 参数        | 说明         | 类型                                                                                                                       | 默认值 |
| ----------- | ------------ | -------------------------------------------------------------------------------------------------------------------------- | ------ |
| type        | 类型         | [ButtonType](https://github.com/fangzhioo/fz-design/blob/master/packages/fz-design/components/button/src/interface.ts#L12) | -      |
| size        | 尺寸         | [ButtonSize](https://github.com/fangzhioo/fz-design/blob/master/packages/fz-design/components/button/src/interface.ts#L19) | -      |
| text        | 文本按钮     | `boolean`                                                                                                                  | false  |
| native-type | 原生类型     | [ButtonNative](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/button#attr-type)                                 | button |
| disabled    | 是否禁用     | `boolean`                                                                                                                  | false  |
| icon        | 图标         | [IconSlotType](https://github.com/fangzhioo/fz-design/blob/master/packages/fz-design/types/component.ts#L3)                | -      |
| loading     | 是否加载中   | `boolean`                                                                                                                  | false  |
| plain       | 是否简单风格 | `boolean`                                                                                                                  | false  |
| round       | 是否圆角风格 | `boolean`                                                                                                                  | false  |
| circle      | 是否圆形风格 | `boolean`                                                                                                                  | false  |
| autofocus   | 自动对焦     | `boolean`                                                                                                                  | false  |

### Slots

| 名称      | 说明      |
| --------- | --------- |
| `default` | 默认内容  |
| `icon`    | 图标 slot |

### Events

| 事件名  | 说明     | 参数列表 | 参数说明         |
| ------- | -------- | -------- | ---------------- |
| `click` | 点击事件 | $event   | 原生的 dom event |

### Interface

组件导出以下类型定义：

```ts
import type { ButtonInstance, ButtonProps, ButtonType, ButtonSize } from 'fz-design'
```

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式

| 名称                     | 描述         |
| ------------------------ | ------------ |
| `--fz-button-bg-color`   | 按钮背景色   |
| `--fz-button-text-color` | 按钮文字颜色 |
| `...`                    | ...          |

## ButtonGroup API

### Attributes

| 参数 | 说明 | 类型     | 默认值 |
| ---- | ---- | -------- | ------ |
| type | 类型 | `string` | -      |
| size | 尺寸 | `string` | -      |

### Slots

| 名称      | 说明      |
| --------- | --------- |
| `default` | Button元素  |
