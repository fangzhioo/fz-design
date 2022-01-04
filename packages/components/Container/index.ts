import { App, Plugin } from 'vue';
import Container from './src/Container.vue';
import Main from './src/Main.vue';
import Aside from './src/Aside.vue';
import Header from './src/Header.vue';
import Footer from './src/Footer.vue';

export const ContainerPlugin: Plugin = {
  install(app: App) {
    app.component('FzContainer', Container);
    app.component('FzMain', Main);
    app.component('FzAside', Aside);
    app.component('FzHeader', Header);
    app.component('FzFooter', Footer);
  },
};

export { Container, Main, Aside, Header, Footer };
