import { App, Plugin } from 'vue';
import ColorPicker from './src/ColorPicker.vue';

export const ColorPickerPlugin: Plugin = {
  install(app: App) {
    app.component(ColorPicker.name, ColorPicker);
  },
};

export {
  ColorPicker,
};
