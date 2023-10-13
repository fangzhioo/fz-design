<p align="center">
  <img height="160px" src="https://raw.githubusercontent.com/fangzhioo/images/4ad62a8f00aa2473deca61598f307430d8d4a4cf/fz-design/fangzhioo.svg">
  <h2 align="center" style="font-weight: 600">Fz Design</h2>
</p>

<p align="center">
  Fz Design 可在 vue3 应用程序中快速构建交互界面，旨在简单高效，依赖单一。
</p>

<p align="center">
  中文 | <a href="https://github.com/fangzhioo/fz-design/blob/master/README.en-US.md">English</a>
</p>

<p align="center">
  <a href="https://github.com/fangzhioo/fz-design/stargazers"><img src="https://img.shields.io/github/stars/fangzhioo/fz-design" /></a>
  <a href="https://www.npmjs.com/package/fz-design"><img src="https://badgen.net/npm/v/fz-design" /></a>
  <a href="https://fangzhioo.github.io/fz-design"><img src="https://img.shields.io/badge/Fz%20Design-Docs-blue" /></a>
  <a href="https://github.com/fangzhioo/fz-design/blob/master/CHANGELOG.md"><img src="https://img.shields.io/badge/Fz%20Design-CHANGELOG-blue" /></a>
</p>

## ✨ 特性

- 🪐 50+ 常用组件
- 🌍 国际化
- 🌛 明暗主题
- 💪 使用 Vue.js 最新特性开发
- 🐆 全面基于 Vite，速度够快
- 🤟 极致的开发体验
- 🥇 超详细的 JSDoc 注释
- 🦩 零第三方依赖
- ✂️ 完善的代码提示
- 🪐 不同打包模式，兼容不同项目
- 🏆 支持完整引入和按需引入
- ✅ 使用 TypeScript + Template 编写
- 🖍️ 严格的 TypeScript 类型
- ✔️ 配置简单，上手容易
- 🚩 单元测试
- 📃 优质详细的文档
- 📌 完善 RFC
- 🛠 更多特性开发中

## 🔑 安装

使用 `pnpm` 安装

```shell
pnpm add --save-dev fz-design
```

使用 `npm` 安装

```shell
npm install --save-dev fz-design
```

使用 `yarn` 安装

```shell
yarn add --save-dev fz-design
```

## 🎉 快速上手

在 `main.ts` 中引入下面内容

```ts
import { createApp } from 'vue'
import App from './App.vue'
import FzDesign from 'fz-design'
import 'fz-design/dist/index.css'

createApp(App).use(FzDesign).mount('#app')
```

## 🪂 快速体验

```html
<head>
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/fz-design/dist/index.css"
  />
</head>

<body>
  <div id="app">
    <fz-button round type="default">默认按钮</fz-button>

    <fz-divider>华丽的分隔线</fz-divider>

  </div>

  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.global.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/fz-design/dist/index.umd.js"></script>
  <script>
    const { createApp, ref } = Vue

    const app = createApp({
      setup() {
        const visible = ref(false)

        return { visible }
      }
    })

    app.use(FzDesign.default)
    app.mount('#app')
  </script>
</body>
```

## 🐳 相关链接

- [官方文档](https://fangzhioo.github.io/fz-design)
- [NPM](https://www.npmjs.com/package/fz-design)
- [贡献指南](https://fangzhioo.github.io/fz-design/docs/contributing.html)
- [更新日志](https://fangzhioo.github.io/fz-design/docs/changelog.html)

## 💬 执照

[MIT](https://github.com/fangzhioo/fz-design/blob/master/LICENSE)
