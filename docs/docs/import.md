# 快速上手

## 完整引入

在 `main.ts` 中引入下面内容

```ts
import { createApp } from 'vue'
import App from './App.vue'

import FzDesign from 'fz-design'
import 'fz-design/dist/index.css'

createApp(App).use(FzDesign).mount('#app')
```

## 按需引入

为了减小体积，只希望引入部分组件，可以使用按需引入的方式

```ts
import { createApp } from 'vue'
import App from './App.vue'

// 组件按需引入
import { FzButton, FzCard } from 'fz-design'

// 样式按需引入
import 'fz-design/theme/button.css'
import 'fz-design/theme/card.css'

createApp(App).use(FzButton).use(FzCard).mount('#app')
```

## 使用 UMD

可通过 `UMD` 模式在 `*.html` 中引入 `Fz Design`，快速构建您的程序

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
