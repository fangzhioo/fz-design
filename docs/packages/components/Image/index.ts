import { App, Plugin } from 'vue';
import Image from './src/Image.vue';

export const ImagePlugin: Plugin = {
  install(app: App) {
    app.component(Image.name, Image);
  },
};

export {
  Image,
};
