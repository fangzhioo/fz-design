import { App, Plugin } from 'vue';
import Badge from './src/Badge.vue';

export type { BadgeProps } from './src/Badge';

export const BadgePlugin: Plugin = {
  install(app: App) {
    app.component(Badge.name, Badge);
  },
};

export { Badge };
