import { App, Plugin } from 'vue';
import Overlay from './src/Overlay';

export const OverlayPlugin: Plugin = {
  install(app: App) {
    app.component(Overlay.name, Overlay);
  },
};

export { Overlay };
