import { App, Plugin } from 'vue';
import RichEditor from './src/RichEditor.vue';

export * from './src/RichEditor';

export const RichEditorPlugin: Plugin = {
  install(app: App) {
    app.component(RichEditor.name, RichEditor);
  },
};

export { RichEditor };
