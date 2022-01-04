import { App, Plugin } from 'vue';
import Button from './src/Button.vue';
import ButtonGroup from './src/ButtonGroup.vue';

export const ButtonPlugin: Plugin = {
  install(app: App) {
    app.component('FzButton', Button);
    app.component('FzButtonGroup', ButtonGroup);
  },
};

export { Button, ButtonGroup };
