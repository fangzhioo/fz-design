import { App, Plugin } from 'vue';
import Switch from './src/Switch.vue';

export const SwitchPlugin: Plugin = {
  install(app: App) {
    app.component(Switch.name, Switch);
  },
};

export {
  Switch,
};
