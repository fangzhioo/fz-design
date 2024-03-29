# Docs

## ✨ 介绍

Docs 是 FzDesign 官方文档目录，使用 [VitePress](https://github.com/vuejs/vitepress) 进行开发。

`vitePress` 是一个 `Vite` 和 `Vue` 支持的静态站点生成器，使用 [MarkDown](https://zh.wikipedia.org/zh-tw/Markdown) 进行编写。如果你还不了解 `MarkDown`，可以通过[这里](http://younghz.github.io/Markdown/)进行学习。

如果你也想编写自己的 `blog`，可以在 [VitePress](https://github.com/vuejs/vitepress) 官方进行学习使用。

## 🐳 线上地址

- 官方文档：[Fz Design](https://fangzhioo.github.io/fz-design)

## 🚧 编写规范

首先需要在 [docs/components](https://github.com/fangzhioo/fz-design/tree/master/docs/components) 目录下，新建一个以组件小写名，去掉前缀 `Fz` 的 `*.md` 文件。如：`button`，而不是 `FzButton`。

- `*.md` 内，只允许出现一个一级标题 `#`，后面全部使用 二级标题 `##`和 三级标题 `###`，禁止出现三级标题以下的标题。
- 一级标题为`组件的名称 + 中文描述`，中间要带有空格。如：`Button 按钮`、`Icon 图标`。这里的组件名要以大写开头
- 接下来每个二级标题用于描述配置信息，配置信息下面要写入简单的描述。如下，取自 [button.md](https://github.com/fangzhioo/fz-design/blob/master/docs/components/button.md)：

```
## 基本使用

`type` 属性可以配置不同的按钮类型，展示不同的颜色状态
```

- 并不是组件的所有配置项都要带有演示用例，突出主要即可
- 英文名要用反引号包裹，左右两边要带有空格。如： `type` 配置按钮的类型
- 描述信息之后要带有具体的配置例子
- 需要提供演效果的代码段，基于 element-plus 文档的 [实现逻辑](https://github.com/element-plus/element-plus/blob/dev/docs/.vitepress/config/plugins.ts) ，封装好的 `::: demo` 语法来展示 demo 和下拉菜单内容，详情配置可参考 [plugins.ts](https://github.com/fangzhioo/fz-design/blob/master/docs/.vitepress/plugin/plugin-demo.ts) 。例：

```
::: demo

xxx/basic

:::

```

- 在组件演示完之后，要写详细的 `Attributes`（必须）、`Slots`（可选）、`Events`（可选）描述信息。使用 `table` 进行编写，格式规范参考如下：

Attributes

| 参数  | 说明 | 类型 | 默认值 | 
| ----- | ---- | ---- | ------ | 
| xxx | xxx  | `xxx`  | `xxx  | 

Slots

| 名称  | 说明 |
| ----- | ---- |
| xxx | xxx  |

Events

| 事件名称 | 说明 | 类型 |
| -------- | ---- | -------- |
| xxx    | xxx  | `xxx`      |

- 在上面表格中的类型相关内容需要使用反引号包裹，名称列每一项都应该使用 [kebab-case](https://staging-cn.vuejs.org/guide/components/props.html#prop-passing-details) 形式。
- 表格中需要详细的描述好每个选项。

## 🔍 扩展语法

- 在 `*.md` 内部可以直接写入 `vue` 组件代码，完全可以正常解析
- 在 `*.md` 内部可以直接定义和本页面相关的样式，或者 `TypeScript` 语法，完全可以像下面这样使用：

```
# xxx

## xxx

code....

<script setup lang="ts">
TypeScript code...
</script>

<style scoped>
css code...
<style>
```

值得注意的是，在 `docs/components` 目录下 `*.md` 文件被 [MarkdownTransform](https://github.com/fangzhioo/fz-design/blob/master/docs/.vitepress/plugin/markdown-transform.ts) 进行了特殊处理（自动导入demos），所以无法再支持在其中添加 `script setup` 部分。

## ✏️ 引入

在你新建的组件文档文件之后，你需要在 [sidebar](https://github.com/fangzhioo/fz-design/blob/master/docs/.vitepress/config/sidebar.ts) 中引入你的文档，才可以正常显示

## 💡 测试

在项目根目录执行命令：

```shell
pnpm dev:docs
```

来启动测试文档

## 💬 写在最后

规范可能随时会增加或者修改，在编写文档前请认真阅读规范指南。
