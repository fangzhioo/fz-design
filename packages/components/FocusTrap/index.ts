import { App, Plugin } from 'vue';
import FocusTrap from './src/FocusTrap.vue';

export * from './src/utils';

export const FocusTrapPlugin: Plugin = {
  install(app: App) {
    app.component(FocusTrap.name, FocusTrap);
  },
};

export { FocusTrap };
