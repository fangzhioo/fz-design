import { App, Plugin } from 'vue';
import Select from './src/Select.vue';
import SelectOption from './src/SelectOption.vue';
import SelectOptionGroup from './src/SelectOptionGroup.vue';

export const SelectPlugin: Plugin = {
  install(app: App) {
    app.component(Select.name, Select);
    app.component(SelectOption.name, SelectOption);
    app.component(SelectOptionGroup.name, SelectOptionGroup);
  },
};

export { Select, SelectOption, SelectOptionGroup };
