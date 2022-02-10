import { App, Plugin } from 'vue';
import ConfigProvider from './src/ConfigProvider.vue';

export const ConfigProviderPlugin: Plugin = {
  install(app: App) {
    app.component(ConfigProvider.name, ConfigProvider);
  },
};

export { ConfigProvider };
