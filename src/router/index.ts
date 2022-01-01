import {
  createRouter,
  createWebHashHistory,
  RouteRecordRaw,
  RouterOptions,
} from 'vue-router';
import NotFound from '@/pages/NotFound.vue';
import { componentRoutes } from './componentRoutes';

const routes: RouteRecordRaw[] = [
  {
    name: 'Home',
    path: '/',
    redirect: '/guide',
    component: () => import('@/layouts/BaseLayout.vue'),
    children: [
      {
        name: 'Guide',
        path: '/guide',
        component: () => import('@/pages/guide/index.vue'),
      },
      {
        name: 'Components',
        path: '/components',
        redirect: '/components/Button',
        component: () => import('@/pages/components/index.vue'),
        children: [...componentRoutes],
      },
      {
        name: 'Changelog',
        path: '/changelog',
        component: () => import('@/pages/changelog/index.vue'),
      },
    ],
  },
  {
    path: '/:error(.*)*',
    name: 'NotFound',
    component: NotFound,
  },
];

const routerConfig: RouterOptions = {
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 滚动行为
    // hash锚点
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      };
    }
    if (savedPosition) {
      // 浏览器的原生表现
      return savedPosition;
    }
    // 滚动到顶部
    if (to.path !== from.path) {
      return { top: 0 };
    }
    // 加延迟
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ left: 0, top: 0 });
      }, 500);
    });
  },
};

const router = createRouter(routerConfig);

export default router;
