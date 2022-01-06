import { App, Plugin } from 'vue';
import Icon from './src/Icon.vue';

export const IconPlugin: Plugin = {
  install(app: App) {
    app.component('FzIcon', Icon);
  },
};

export {
  Icon,
};
