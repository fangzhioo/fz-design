import { App, Plugin } from 'vue';
import Popper from './src/Popper.vue';
import PopperArrow from './src/PopperArrow.vue';
import PopperContent from './src/PopperContent.vue';
import PopperTrigger from './src/PopperTrigger.vue';
import { popperArrowProps, popperContentProps, popperTriggerProps } from './src/Popper';
import type { PopperProps, PopperCoreConfigProps, Effect, PopperjsCoreOptions, PopperjsCorePlacement } from './src/Popper';

export const PopperPlugin: Plugin = {
  install(app: App) {
    app.component(Popper.name, Popper);
  },
};

export type { PopperProps, PopperCoreConfigProps, Effect, PopperjsCoreOptions, PopperjsCorePlacement };
export { popperArrowProps, popperContentProps, popperTriggerProps };
export { Popper, PopperArrow, PopperContent, PopperTrigger };
