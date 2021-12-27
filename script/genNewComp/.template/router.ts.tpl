/**
 * !--------- FBI WARNING ----------!
 * 根据 /packages 目录下的组件所生成的组件类侧边导航栏配置，请勿手动修改
 */

import { createRouter, createWebHashHistory, RouterOptions } from 'vue-router'

const routes = [
  {{ routes }}
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
