import { App, Plugin } from 'vue';
import Affix from './src/Affix.vue';

export const AffixPlugin: Plugin = {
  install(app: App) {
    app.component(Affix.name, Affix);
  },
};

export { Affix };
