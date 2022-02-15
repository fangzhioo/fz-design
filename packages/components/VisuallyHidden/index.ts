import { App, Plugin } from 'vue';
import VisuallyHidden from './src/VisuallyHidden.vue';

export const VisuallyHiddenPlugin: Plugin = {
  install(app: App) {
    app.component(VisuallyHidden.name, VisuallyHidden);
  },
};

export {
  VisuallyHidden,
};
