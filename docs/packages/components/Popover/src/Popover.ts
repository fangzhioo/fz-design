import { UPDATE_VISIBLE_EVENT } from '@fzui/constants';
import { ClassType } from '@fzui/utils';
import { ExtractPropTypes, PropType, StyleValue } from 'vue';
import type Popover from './Popover.vue';

export const popoverEmits = [UPDATE_VISIBLE_EVENT, 'after-enter', 'after-leave'];

export const popoverProps = {
  appendToBody: {
    type: Boolean,
    default: undefined,
  },
  content: {
    type: String,
    default: '',
  },
  popperStyle: {
    type: [String, Array, Object] as PropType<StyleValue>,
  },
  popperClass: {
    type: [String, Array, Object] as PropType<ClassType>,
  },
  enterable: {
    type: Boolean,
    default: true,
  },
  effect: {
    type: String,
    default: 'light',
  },
  teleported: {
    type: Boolean,
    default: true,
  },
  title: String,
  width: {
    type: [String, Number],
    default: 150,
  },
};

export type PopoverProps = ExtractPropTypes<typeof popoverProps>;
export type PopoverEmits = typeof popoverEmits;
export type PopoverInstance = InstanceType<typeof Popover>;
