import { SFCWithInstall } from '@fzui/utils/types';
import { App, Plugin } from 'vue';
import Popper from './src/Popper.vue';

export const PopperPlugin: Plugin = {
  install(app: App) {
    app.component('FzPopper', Popper);
  },
};

const _Popper = Popper as SFCWithInstall<typeof Popper>;

export default _Popper;

export { popperProps } from './src/Popper';
export * from './src/renderers';
export { default as usePopper } from './src/use-popper';
export type { Placement, Options } from '@popperjs/core';
export type { EmitType } from './src/use-popper';
export type { TriggerType, IPopperOptions, PopperInstance, PopperEffect } from './src/Popper';

export { Popper };
