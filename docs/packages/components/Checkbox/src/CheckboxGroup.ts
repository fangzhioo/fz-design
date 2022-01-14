import { ComponentSize } from '@fzui/hooks';
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '@fzui/utils/constants';
import { ExtractPropTypes, PropType } from 'vue';
import type CheckboxGroup from './CheckboxGroup.vue';

export const checkboxGroupEmits = [UPDATE_MODEL_EVENT, CHANGE_EVENT];

export const checkboxGroupProps = {
  modelValue: {
    type: Array,
    default: () => [],
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  min: {
    type: Number,
    default: undefined,
  },
  max: {
    type: Number,
    default: undefined,
  },
  size: {
    type: String as PropType<ComponentSize>,
  },
  fill: {
    type: String,
    default: undefined,
  },
  textColor: {
    type: String,
    default: undefined,
  },
};

export type CheckboxGroupProps = ExtractPropTypes<typeof checkboxGroupProps>;
export type CheckboxGroupEmits = typeof checkboxGroupEmits;
export type CheckboxGroupInstance = InstanceType<typeof CheckboxGroup>;
