import { App, Plugin } from 'vue';
import InputNumber from './src/InputNumber.vue';

export const InputNumberPlugin: Plugin = {
  install(app: App) {
    app.component(InputNumber.name, InputNumber);
  },
};

export {
  InputNumber,
};
