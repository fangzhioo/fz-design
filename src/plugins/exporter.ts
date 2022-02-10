/**
 * 用来拓展 window 对象
 */

import { App } from 'vue';

declare global {
  interface Window {
    $app: App;
  }
}

export const exportAppToGlobal = (app: App) => {
  window.$app = app;
};
