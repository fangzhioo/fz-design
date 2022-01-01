import { App, Plugin } from 'vue';
import {{ compName }} from './src/{{ compName }}.vue';

export const {{ compName }}Plugin: Plugin = {
  install(app: App) {
    app.component('{{ compPrefix }}{{ compName }}', {{ compName }});
  },
};

export {
  {{ compName }},
};
