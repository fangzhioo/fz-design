import { App, Plugin } from 'vue';
import Calendar from './src/Calendar.vue';

export const CalendarPlugin: Plugin = {
  install(app: App) {
    app.component(Calendar.name, Calendar);
  },
};

export {
  Calendar,
};
