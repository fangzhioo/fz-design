import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '@fzui/constants';
import { ExtractPropTypes, PropType } from 'vue';
import type { Ref } from 'vue';
import type Collapse from './Collapse.vue';

export interface CollapseProvider {
  activeNames: Ref;
  handleItemClick: (name: string | number) => void;
}

export type CollapseModelValue = string | number | Array<string | number>;

export const collapseEmits = [UPDATE_MODEL_EVENT, CHANGE_EVENT];

export const collapseProps = {
  accordion: Boolean,
  modelValue: {
    type: [Array, String, Number] as PropType<CollapseModelValue>,
    default: () => [],
  },
};

export type CollapseProps = ExtractPropTypes<typeof collapseProps>;
export type CollapseEmits = typeof collapseEmits;
export type CollapseInstance = InstanceType<typeof Collapse>;
