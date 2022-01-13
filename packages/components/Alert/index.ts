import { App, Plugin } from 'vue';
import Alert from './src/Alert.vue';

export const AlertPlugin: Plugin = {
  install(app: App) {
    app.component('FzAlert', Alert);
  },
};

export {
  Alert,
};
