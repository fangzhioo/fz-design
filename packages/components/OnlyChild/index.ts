import { App, Plugin } from 'vue';
import OnlyChild, { OnlyChildExpose } from './src/OnlyChild';

export const OnlyChildPlugin: Plugin = {
  install(app: App) {
    app.component(OnlyChild.name, OnlyChild);
  },
};

export type { OnlyChildExpose };
export { OnlyChild };
