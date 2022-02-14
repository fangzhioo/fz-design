import { App, Plugin } from 'vue';
import Collapse from './src/Collapse.vue';
import CollapseItem from './src/CollapseItem.vue';
import CollapseTransition from './src/CollapseTransition.vue';

export const CollapsePlugin: Plugin = {
  install(app: App) {
    app.component(Collapse.name, Collapse);
    app.component(CollapseItem.name, CollapseItem);
    app.component(CollapseTransition.name, CollapseTransition);
  },
};

export { Collapse, CollapseItem, CollapseTransition };
