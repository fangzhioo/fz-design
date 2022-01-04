import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import './assets/markdown.css';

import FzUI from '@fzui/components';
import '@fzui/components/style.less';
import './assets/commom.less';
import Preview from './components/Preview.vue';

const app = createApp(App);

app.component('Preview', Preview);

app.use(FzUI);

app.use(router);

router.isReady().finally(() => {
  app.mount('#app');
});
