import { App, Plugin } from 'vue';
import Form from './src/Form.vue';
import FormItem from './src/FormItem.vue';

export * from './src/Form';
export * from './src/FormItem';

export const FormPlugin: Plugin = {
  install(app: App) {
    app.component(Form.name, Form);
    app.component(FormItem.name, FormItem);
  },
};

export { Form, FormItem };
