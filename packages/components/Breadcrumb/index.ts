import { App, Plugin } from 'vue';
import Breadcrumb from './src/Breadcrumb.vue';

export const BreadcrumbPlugin: Plugin = {
  install(app: App) {
    app.component('FzBreadcrumb', Breadcrumb);
  },
};

export {
  Breadcrumb,
};
