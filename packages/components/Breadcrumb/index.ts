import { App, Plugin } from 'vue';
import Breadcrumb from './src/Breadcrumb.vue';
import BreadcrumbItem from './src/BreadcrumbItem.vue';

export const BreadcrumbPlugin: Plugin = {
  install(app: App) {
    app.component(Breadcrumb.name, Breadcrumb);
    app.component(BreadcrumbItem.name, BreadcrumbItem);
  },
};

export { Breadcrumb };
