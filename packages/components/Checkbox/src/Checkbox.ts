import { ComponentSize } from '@fzui/hooks';
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '@fzui/constants';
import { ExtractPropTypes, PropType } from 'vue';
import type Checkbox from './Checkbox.vue';

export type CheckboxModelValue = boolean | number | string | undefined;
export const checkboxEmits = [UPDATE_MODEL_EVENT, CHANGE_EVENT];

export const checkboxProps = {
  modelValue: {
    type: [Boolean, Number, String] as PropType<CheckboxModelValue>,
    default: () => undefined,
  },
  label: {
    type: [String, Boolean, Number, Object],
  },
  indeterminate: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  checked: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    default: undefined,
  },
  trueLabel: {
    type: [String, Number],
    default: undefined,
  },
  falseLabel: {
    type: [String, Number],
    default: undefined,
  },
  id: {
    type: String,
    default: undefined,
  },
  controls: {
    type: String,
    default: undefined,
  },
  border: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String as PropType<ComponentSize>,
  },
  tabindex: {
    type: [String, Number],
  },
};

export type CheckboxProps = ExtractPropTypes<typeof checkboxProps>;
export type CheckboxEmits = typeof checkboxEmits;
export type CheckboxInstance = InstanceType<typeof Checkbox>;
