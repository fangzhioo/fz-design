import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '@fzui/constants';
import { ExtractPropTypes } from 'vue';
import type CheckboxButton from './CheckboxButton.vue';

export const checkboxButtonEmits = [UPDATE_MODEL_EVENT, CHANGE_EVENT];

export const checkboxButtonProps = {
  modelValue: {
    type: [Boolean, Number, String],
    default: () => undefined,
  },
  label: {
    type: [String, Boolean, Number, Object],
  },
  indeterminate: Boolean,
  disabled: Boolean,
  checked: Boolean,
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
  tabindex: [String, Number],
  size: String,
};

export type CheckboxButtonProps = ExtractPropTypes<typeof checkboxButtonProps>;
export type CheckboxButtonEmits = typeof checkboxButtonEmits;
export type CheckboxButtonInstance = InstanceType<typeof CheckboxButton>;
