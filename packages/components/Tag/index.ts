import { App, Plugin } from 'vue';
import Tag from './src/Tag.vue';

export const TagPlugin: Plugin = {
  install(app: App) {
    app.component(Tag.name, Tag);
  },
};

export {
  Tag,
};
