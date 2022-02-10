import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/commom.less';
import './assets/markdown.less';

import FzUI from '@fzui/components';
import '@fzui/theme/index.less';
import Preview from './components/Preview.vue';
import { exportAppToGlobal } from './plugins/exporter';

const app = createApp(App);

app.component('Preview', Preview);

app.use(FzUI);

app.use(router);

router.isReady().finally(() => {
  app.mount('#app');
  const isDarkTheme = window.matchMedia('(prefers-color-scheme: dark)');
  if (isDarkTheme.matches) {
    document.documentElement.setAttribute('data-mode', 'dark');
  }
  exportAppToGlobal(app);
});
