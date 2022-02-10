import { App, Plugin } from 'vue';
import Card from './src/Card.vue';

export const CardPlugin: Plugin = {
  install(app: App) {
    app.component(Card.name, Card);
  },
};

export {
  Card,
};
