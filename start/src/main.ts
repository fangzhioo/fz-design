import { createApp } from 'vue'
import App from './App.vue'

// 开发阶段引入
import FzDesign from 'fz-design'
import '@fz-design/fz-design-theme'

createApp(App).use(FzDesign).mount('#start')
