import { App, Plugin } from 'vue';
import Affix from './src/Affix.vue';

export const AffixPlugin: Plugin = {
  install(app: App) {
    app.component('FzAffix', Affix);
  },
};

export {
  Affix,
};
