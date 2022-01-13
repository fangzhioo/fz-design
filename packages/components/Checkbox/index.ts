import { App, Plugin } from 'vue';
import Checkbox from './src/Checkbox.vue';
import CheckboxGroup from './src/CheckboxGroup.vue';
import CheckboxButton from './src/CheckboxButton.vue';

export const CheckboxPlugin: Plugin = {
  install(app: App) {
    app.component('FzCheckbox', Checkbox);
    app.component('FzCheckboxGroup', CheckboxGroup);
    app.component('FzCheckboxButton', CheckboxButton);
  },
};

export { Checkbox, CheckboxGroup, CheckboxButton };
