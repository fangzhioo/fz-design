import { App, Plugin } from 'vue';
import Scrollbar from './src/Scrollbar.vue';

export const ScrollbarPlugin: Plugin = {
  install(app: App) {
    app.component(Scrollbar.name, Scrollbar);
  },
};

export { Scrollbar };
