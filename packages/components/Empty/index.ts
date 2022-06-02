import { App, Plugin } from 'vue';
import Empty from './src/Empty.vue';

export const EmptyPlugin: Plugin = {
  install(app: App) {
    app.component(Empty.name, Empty);
  },
};

export {
  Empty,
};
