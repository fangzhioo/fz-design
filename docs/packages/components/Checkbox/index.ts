import { App, Plugin } from 'vue';
import Checkbox from './src/Checkbox.vue';
import CheckboxGroup from './src/CheckboxGroup.vue';
import CheckboxButton from './src/CheckboxButton.vue';

export const CheckboxPlugin: Plugin = {
  install(app: App) {
    app.component(Checkbox.name, Checkbox);
    app.component(CheckboxGroup.name, CheckboxGroup);
    app.component(CheckboxButton.name, CheckboxButton);
  },
};

export { Checkbox, CheckboxGroup, CheckboxButton };
