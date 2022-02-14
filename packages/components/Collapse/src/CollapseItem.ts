import { generateUUID } from '@fzui/utils';
import { ExtractPropTypes, PropType } from 'vue';
import type CollapseItem from './CollapseItem.vue';

export const collapseItemEmits = {};

export const collapseItemProps = {
  title: {
    type: String,
    default: '',
  },
  name: {
    type: [String, Number] as PropType<string | number>,
    default: () => {
      return generateUUID();
    },
  },
  disabled: Boolean,
};

export type CollapseItemProps = ExtractPropTypes<typeof collapseItemProps>;
export type CollapseItemEmits = typeof collapseItemEmits;
export type CollapseItemInstance = InstanceType<typeof CollapseItem>;
