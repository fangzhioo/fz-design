# Svg Icon 图标

使用 svg 的图标库

::: tip 你需要注意

`svg-icon` 同时支持 `icon` 配置项和默认插槽来实现 `icon` 的展示，但 `icon` 配置项的优先级高于插槽。FzDesign 内部其它一切依赖 `svg-icon` 的所有组件，都依赖这个规则

:::

## 使用之前

在使用 `svg-icon` 组件之前，需要先进行安装

```shell
# pnpm
pnpm add --save-dev @fz-design/fz-design-icon

# npm
npm i --save-dev @fz-design/fz-design-icon

# yarn
yarn add --save-dev @fz-design/fz-design-icon
```

## 基本使用

`fz-svg-icon` 需要插入一个 `svg`

`color` 和 `size` 属性可分别对于颜色和字体大小进行配置

它同时支持 `icon` 属性传递和插槽

::: demo

svg-icon/basic

:::

## 图表集合

`svg-icon` 集合，**点击即可直接复制**，收录图标来自[Feather](https://feathericons.com/)，详细看查看 [@fz-design/fz-design-icon](https://www.npmjs.com/package/@fz-design/fz-design-icon) .

:::demo

svg-icon/maps

:::

## Attributes

| 参数    | 说明      | 类型            | 默认值 |
| ------- | --------- | --------------- | ------ |
| `color` | icon 颜色 | string          | ——     |
| `size`  | icon 大小 | string / number | ——     |
| `icon`  | icon 内容 | SvgIcon         | ——     |

## Slots

| 名称      | 说明        |
| --------- | ----------- |
| `default` | icon 的内容 |

## Interface

组件导出以下类型定义：

```ts
import type { SvgIconInstance, SvgIconProps } from 'fz-design'
```
