import { Loading } from './src/service';
import { vLoading } from './src/directive';

import type { App } from 'vue';

// installer and everything in all
export const LoadingPlugin = {
  install(app: App) {
    app.directive('loading', vLoading);
    app.config.globalProperties.$loading = Loading;
  },
  directive: vLoading,
  service: Loading,
};

const FzLoading = LoadingPlugin;

export { vLoading, vLoading as ElLoadingDirective, Loading as ElLoadingService, FzLoading };

export * from './src/Loading';
