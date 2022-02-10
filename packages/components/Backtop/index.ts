import { App, Plugin } from 'vue';
import Backtop from './src/Backtop.vue';

export const BacktopPlugin: Plugin = {
  install(app: App) {
    app.component(Backtop.name, Backtop);
  },
};

export { Backtop };
