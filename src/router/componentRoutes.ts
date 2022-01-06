/**
 * !--------- FBI WARNING ----------!
 * 根据 /packages 目录下的组件所生成的组件类侧边导航栏配置，请勿手动修改
 */

export const componentRoutes = [
  {
        title: '按钮',
        name: 'ComponentButton',
        path: '/components/Button',
        component: () => import('@fzui/components/Button/docs/README.md'),
      },{
        title: '输入框',
        name: 'ComponentInput',
        path: '/components/Input',
        component: () => import('@fzui/components/Input/docs/README.md'),
      },{
        title: '配置提供者',
        name: 'ComponentConfigProvider',
        path: '/components/ConfigProvider',
        component: () => import('@fzui/components/ConfigProvider/docs/README.md'),
      },{
        title: '布局容器',
        name: 'ComponentContainer',
        path: '/components/Container',
        component: () => import('@fzui/components/Container/docs/README.md'),
      },{
        title: '固钉',
        name: 'ComponentAffix',
        path: '/components/Affix',
        component: () => import('@fzui/components/Affix/docs/README.md'),
      },{
        title: '图标',
        name: 'ComponentIcon',
        path: '/components/Icon',
        component: () => import('@fzui/components/Icon/docs/README.md'),
      }
];

