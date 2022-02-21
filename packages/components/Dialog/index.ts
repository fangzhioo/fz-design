import { App, Plugin } from 'vue';
import Dialog from './src/Dialog.vue';

export const DialogPlugin: Plugin = {
  install(app: App) {
    app.component(Dialog.name, Dialog);
  },
};

export { Dialog };

export * from './src/Dialog';
export * from './src/hooks/useDialog';
