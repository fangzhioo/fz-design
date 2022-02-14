import { App, Plugin } from 'vue';
import CheckTag from './src/CheckTag.vue';

export const CheckTagPlugin: Plugin = {
  install(app: App) {
    app.component(CheckTag.name, CheckTag);
  },
};

export {
  CheckTag,
};
