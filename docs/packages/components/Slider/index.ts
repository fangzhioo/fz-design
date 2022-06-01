import { App, Plugin } from 'vue';
import Slider from './src/Slider.vue';

export const SliderPlugin: Plugin = {
  install(app: App) {
    app.component(Slider.name, Slider);
  },
};

export {
  Slider,
};
