import { App, Plugin } from 'vue';
import DatePicker from './src/DatePicker.vue';

export const DatePickerPlugin: Plugin = {
  install(app: App) {
    app.component(DatePicker.name, DatePicker);
  },
};

export {
  DatePicker,
};
