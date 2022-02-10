import { App, Plugin } from 'vue';
import Container from './src/Container.vue';
import Main from './src/Main.vue';
import Aside from './src/Aside.vue';
import Header from './src/Header.vue';
import Footer from './src/Footer.vue';

export const ContainerPlugin: Plugin = {
  install(app: App) {
    app.component(Container.name, Container);
    app.component(Main.name, Main);
    app.component(Aside.name, Aside);
    app.component(Header.name, Header);
    app.component(Footer.name, Footer);
  },
};

export { Container, Main, Aside, Header, Footer };
