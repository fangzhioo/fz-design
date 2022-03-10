import { App, Plugin } from 'vue';
import Drawer from './src/Drawer.vue';

export const DrawerPlugin: Plugin = {
  install(app: App) {
    app.component(Drawer.name, Drawer);
  },
};

export {
  Drawer,
};
