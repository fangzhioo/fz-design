import type { HeadConfig } from 'vitepress'

/**
 * 头部配置
 *
 * @see head https://vitepress.vuejs.org/config/app-configs#head
 */
export const head: HeadConfig[] = [
  /** 标签栏略缩图 */
  [
    'link',
    {
      rel: 'icon',
      href: 'https://raw.githubusercontent.com/fangzhioo/fz-design/master/logo/fz-design.svg'
    }
  ],
  /** 解决移动端点击输入框自动放大的问题 */
  [
    'meta',
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1.0,user-scalable=no'
    }
  ],
  /** 网站关键词，有助于 SEO 优化 */
  [
    'meta',
    {
      name: 'Keywords',
      content:
        '前端,前端开发,组件库,vue3组件库,vue,vuejs,javascript,typescript,vite,css3,css,html,html5,js,ts,scss,sass,fz-design,fz,fangzhioo,tongren,design,setup,eslint,es6,rollup,components,vitepress,vitest,element,element-ui,ui,element-plus,go,golang,web-components,web,jquery,less,eslint,commitlint,cli,types,node,test-utils,happy-dom,husky'
    }
  ],
  /** 网站作者 */
  [
    'meta',
    {
      name: 'author',
      content: 'FzDesign fangzhioo'
    }
  ],
  /** OG 标题 */
  [
    'meta',
    {
      property: 'og:title',
      content: 'Fz Design 可在 vue3 应用程序中快速构建交互界面，简单高效，单一依赖。'
    }
  ],
  /** OG 类型 */
  [
    'meta',
    {
      property: 'og:type',
      content: 'website'
    }
  ],
  /** OG 略缩图 */
  [
    'meta',
    {
      property: 'og:image',
      content:
        'https://raw.githubusercontent.com/fangzhioo/fz-design/master/logo/fz-design.svg'
    }
  ],
  /** OG 描述 */
  [
    'meta',
    {
      property: 'og:description',
      content: 'Fz Design 可在 vue3 应用程序中快速构建交互界面，旨在简单高效，单一依赖。'
    }
  ],
  /** OG 页面所在网站名 */
  [
    'meta',
    {
      property: 'og:site_name',
      content: 'Fz Design'
    }
  ]
] as HeadConfig[]
