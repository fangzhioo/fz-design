/**
 * 侧边栏菜单
 *
 * @see sidebar https://vitepress.vuejs.org/guide/theme-sidebar#sidebar
 */
export const sidebar = {
  '/docs/': [
    {
      text: '指南',
      items: [
        { text: '介绍', link: '/docs/introduce' },
        { text: '安装', link: '/docs/install' },
        { text: '快速上手', link: '/docs/import' },
        { text: '设计规范', link: '/docs/design' },
      ]
    },
    {
      text: '历程',
      items: [
        { text: '更新日志', link: '/docs/changelog' },
        { text: '关于作者', link: '/docs/aboutme' }
      ]
    }
  ],
  '/components/': [
    {
      text: '基础组件',
      items: [
        { text: 'Button 按钮', link: '/components/button' },
        { text: 'Svg Icon 图标', link: '/components/svg-icon' },
        { text: 'Link 链接', link: '/components/link' },
        { text: 'Text 文本', link: '/components/text' },
        { text: 'Layout 布局', link: '/components/layout' },
        { text: 'Space 间距', link: '/components/space' },
        { text: 'Scrollbar 滚动条', link: '/components/scrollbar' },
      ]
    },
    // {
    //   text: '类型接口',
    //   items: [{ text: 'Interface 接口类型', link: '/components/interface' }]
    // },
    {
      text: '配置组件',
      items: [{ text: 'ConfigProvider 全局配置', link: '/components/config-provider' }]
    },
    {
      text: '表单组件',
      items: [
        { text: 'Form 表单', link: '/components/form' },
        { text: 'Switch 开关', link: '/components/switch' },
        { text: 'Radio 单选框', link: '/components/radio' },
        { text: 'Checkbox 复选框', link: '/components/checkbox' },
        { text: 'Rate 评分', link: '/components/rate' },
        { text: 'Input 输入框', link: '/components/input' },
        { text: 'Input Number 数字输入框', link: '/components/input-number' },
        { text: 'Textarea 文本域', link: '/components/textarea' },
        { text: 'Select 选择器', link: '/components/select' },
        { text: 'Time Picker 时间选择器', link: '/components/time-picker' },
        { text: 'Date Picker 日期选择器', link: '/components/date-picker' },
        { text: 'Color Picker 颜色选择器', link: '/components/color-picker' },
        { text: 'Slider 滑动输入条', link: '/components/slider' },
        { text: 'Up Load 文件上传', link: '/components/up-load' },   

        // TODO
        // { text: 'Cascader 级联选择器', link: '/components/cascader' },
        // { text: 'Transfer 穿梭框', link: '/components/transfer' },
      ]
    },
    {
      text: '数据展示',
      items: [
        { text: 'Avatar 头像', link: '/components/avatar' },
        { text: 'Badge 角标', link: '/components/badge' },
        { text: 'Tag 标签', link: '/components/tag' },
        { text: 'Card 卡片', link: '/components/card' },
        { text: 'Number Animate 数字动画', link: '/components/number-animate' },
        { text: 'Image 图片', link: '/components/image' },
        { text: 'ImagePreview 图片预览', link: '/components/image-preview' },
        { text: 'Swipe 轮播', link: '/components/swipe' },
        { text: 'Progress 进度条', link: '/components/progress' },
        { text: 'Empty 空状态', link: '/components/empty' },
        { text: 'List 列表', link: '/components/list' },
        { text: 'Tree 树', link: '/components/tree' },
        { text: 'StickyCard 粘性卡片', link: '/components/sticky-card' },
        { text: 'Table 表格', link: '/components/table' },
        { text: 'Pagination 分页器', link: '/components/pagination' },
        { text: 'Calendar 日历', link: '/components/calendar' },
        { text: 'InfiniteScrolling 无限滚动', link: '/components/infinite-scrolling' },
      ]
    },
    {
      text: '导航组件',
      items: [
        { text: 'Affix 固钉', link: '/components/affix' },
        { text: 'BackTop 返回顶部', link: '/components/back-top' },
        { text: 'Breadcrumb 面包屑', link: '/components/breadcrumb' },
        { text: 'Page Header 页头', link: '/components/page-header' },
        { text: 'Dropdown 下拉菜单', link: '/components/dropdown' },
        { text: 'Menu 导航菜单', link: '/components/menu' },
        { text: 'Tabs 标签页', link: '/components/tabs' },
      ]
    },
    {
      text: '反馈组件',
      items: [
        { text: 'Alert 提示', link: '/components/alert' },
        { text: 'Loading 加载', link: '/components/loading' },
        { text: 'Message 消息提示', link: '/components/message' },
        { text: 'Notification 通知', link: '/components/notification' },
        { text: 'Skeleton 骨架屏', link: '/components/skeleton' },
        { text: 'Dialog 对话框', link: '/components/dialog' },
        { text: 'Drawer 抽屉', link: '/components/drawer' },
        { text: 'Popconfirm 气泡确认', link: '/components/popconfirm' },
        { text: 'Tooltip 消息提示', link: '/components/tooltip' },
        { text: 'Confirm Box 确认框', link: '/components/confirm-box' },
        { text: 'Swap 切换', link: '/components/swap' },
      ]
    },
    {
      text: '其它',
      items: [
        { text: 'Divider 分隔线', link: '/components/divider' },
        { text: 'Watermark 水印', link: '/components/watermark' },
        { text: 'Count Down 倒计时', link: '/components/count-down' }, 
        { text: 'Danmaku 弹幕', link: '/components/danmaku' },
      ]
    }
  ],
  '/plus': [
    {
      text: '高级组件',
      items: [
        { text: '快速上手', link: '/plus/introduce' },
        { text: 'Signature 签名', link: '/plus/signature' }, 
      ]
    }
  ]
}
