import { version } from '../../../packages/fz-design/package.json'

/**
 * 顶部导航栏菜单
 *
 * @see Nav https://vitepress.vuejs.org/guide/theme-nav#nav
 */
export const nav = [
  {
    text: '指南',
    activeMatch: '^/docs/',
    link: '/docs/install'
  },
  {
    text: '基础组件',
    activeMatch: '^/components/',
    link: '/components/button'
  },
  {
    text: '高级组件',
    activeMatch: '^/plus/',
    link: '/plus/introduce'
  },
  {
    text: version,
    link: 'https://www.npmjs.com/package/fz-design'
  }
  // {
  //   text: '生态系统',
  //   items: [
  //     { text: '自定义主题', activeMatch: '^/theme/', link: '/theme/start' }
  //   ]
  // }
  // {
  //   text: '语言',
  //   items: [
  //     { text: '简体中文', activeMatch: '^/', link: '/index' },
  //     { text: 'English', activeMatch: '^/en-US', link: '/en-US/index' }
  //   ]
  // }
]
