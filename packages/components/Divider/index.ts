import { App, Plugin } from 'vue';
import Divider from './src/Divider.vue';

export const DividerPlugin: Plugin = {
  install(app: App) {
    app.component(Divider.name, Divider);
  },
};

export {
  Divider,
};
