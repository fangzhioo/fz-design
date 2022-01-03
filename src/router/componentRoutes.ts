/**
 * !--------- FBI WARNING ----------!
 * 根据 /packages 目录下的组件所生成的组件类侧边导航栏配置，请勿手动修改
 */

export const componentRoutes = [
  {
        title: '按钮',
        name: 'ComponentButton',
        path: '/components/Button',
        component: () => import('packages/Button/docs/README.md'),
      },{
        title: '输入框',
        name: 'ComponentInput',
        path: '/components/Input',
        component: () => import('packages/Input/docs/README.md'),
      },{
        title: '配置提供者',
        name: 'ComponentConfigProvider',
        path: '/components/ConfigProvider',
        component: () => import('packages/ConfigProvider/docs/README.md'),
      },{
        title: '布局容器',
        name: 'ComponentContainer',
        path: '/components/Container',
        component: () => import('packages/Container/docs/README.md'),
      }
];

