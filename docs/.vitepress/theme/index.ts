import DefaultTheme from 'vitepress/theme'
import './style/vitepress.scss'
// import Layout from './components/vp-layout.vue'
import FzDesign from '../../../packages/fz-design/index'
import VpDemo from './components/demo/vp-demo.vue'
import '@fz-design/fz-design-theme'
import '@fz-design/fz-design-theme/src/dark/dark.scss'

export default {
  ...DefaultTheme,
   /**
     * 导航栏插入搜索的输入框插槽
     *
     * 更多插槽参考
     *
     * @see layout-slots https://vitepress.dev/guide/extending-default-theme#layout-slots
     */
  // Layout,
  // Layout() {
   
  //   return h(DefaultTheme.Layout, null, {
  //     'nav-bar-content-before': () => h(vpSearch)
  //   })
  // },
  enhanceApp({ app }) {
    app.use(FzDesign)
    app.component('vp-demo', VpDemo)
  }
}
