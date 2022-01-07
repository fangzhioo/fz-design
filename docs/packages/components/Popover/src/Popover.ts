import { popperProps, TriggerType } from '@fzui/components/Popper';
import { UPDATE_VISIBLE_EVENT } from '@fzui/utils/constants';
import { ExtractPropTypes, PropType } from 'vue';
import type Popover from './Popover.vue';

export const SHOW_EVENT = 'show';
export const HIDE_EVENT = 'hide';

export const popoverEmits = [UPDATE_VISIBLE_EVENT, SHOW_EVENT, HIDE_EVENT, 'after-enter', 'after-leave'];

export const popoverProps = {
  ...popperProps,
  content: {
    type: String,
  },
  trigger: {
    type: String as PropType<TriggerType>,
    default: 'click',
  },
  title: {
    type: String,
  },
  transition: {
    type: String,
    default: 'fade-in-linear',
  },
  width: {
    type: [String, Number],
    default: 150,
  },
  appendToBody: {
    type: Boolean,
    default: true,
  },
  tabindex: [String, Number],
};

export type PopoverProps = ExtractPropTypes<typeof popoverProps>;
export type PopoverEmits = typeof popoverEmits;
export type PopoverInstance = InstanceType<typeof Popover>;
