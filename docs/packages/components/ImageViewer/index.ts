import { App, Plugin } from 'vue';
import ImageViewer from './src/ImageViewer.vue';

export const ImageViewerPlugin: Plugin = {
  install(app: App) {
    app.component(ImageViewer.name, ImageViewer);
  },
};

export {
  ImageViewer,
};
