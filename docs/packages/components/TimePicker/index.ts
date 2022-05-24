import { App, Plugin } from 'vue';
import TimePicker from './src/TimePicker.vue';
import CommonPicker from './src/common/CommonPicker.vue';
import PanelTimePick from './src/components/PanelTimePick.vue';
import { timePickerProps } from './src/TimePicker';
import { commonPickerProps } from './src/common/CommonPicker';

export * from './src/common/date';
export * from './src/common/util';

export const TimePickerPlugin: Plugin = {
  install(app: App) {
    app.component(TimePicker.name, TimePicker);
  },
};

export { TimePicker, CommonPicker, PanelTimePick, timePickerProps, commonPickerProps };
