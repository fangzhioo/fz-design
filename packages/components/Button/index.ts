import { App, Plugin } from 'vue';
import Button from './src/Button.vue';
import ButtonGroup from './src/ButtonGroup.vue';

export const ButtonPlugin: Plugin = {
  install(app: App) {
    app.component(Button.name, Button);
    app.component(ButtonGroup.name, ButtonGroup);
  },
};

export { Button, ButtonGroup };
