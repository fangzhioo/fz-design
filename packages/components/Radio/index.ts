import { App, Plugin } from 'vue';
import Radio from './src/Radio.vue';
import RadioButton from './src/RadioButton.vue';
import RadioGroup from './src/RadioGroup.vue';

export const RadioPlugin: Plugin = {
  install(app: App) {
    app.component(Radio.name, Radio);
    app.component(RadioButton.name, RadioButton);
    app.component(RadioGroup.name, RadioGroup);
  },
};

export { Radio, RadioButton, RadioGroup };
