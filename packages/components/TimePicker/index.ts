import { App, Plugin } from 'vue';
import TimePicker from './src/TimePicker.vue';

export const TimePickerPlugin: Plugin = {
  install(app: App) {
    app.component(TimePicker.name, TimePicker);
  },
};

export {
  TimePicker,
};
