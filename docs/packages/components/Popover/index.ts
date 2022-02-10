import { App, Plugin } from 'vue';
import PopoverDirective, { VPopover } from './src/directive';
import Popover from './src/Popover.vue';

export const PopoverPlugin: Plugin = {
  install(app: App) {
    app.component(Popover.name, Popover);
    app.directive(VPopover, PopoverDirective);
  },
};

export { Popover };
