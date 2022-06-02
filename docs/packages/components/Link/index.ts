import { App, Plugin } from 'vue';
import Link from './src/Link.vue';

export const LinkPlugin: Plugin = {
  install(app: App) {
    app.component(Link.name, Link);
  },
};

export {
  Link,
};
