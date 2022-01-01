import { App, Plugin } from 'vue';
import Input from './src/Input.vue';

export const InputPlugin: Plugin = {
  install(app: App) {
    app.component('FzInput', Input);
  },
};

export { Input };
