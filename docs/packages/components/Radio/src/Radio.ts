import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '@fzui/constants';
import { ComponentSize } from '@fzui/hooks';
import { isBoolean, isNumber, isString } from '@fzui/utils';
import { ExtractPropTypes, PropType } from 'vue';
import type Radio from './Radio.vue';
import type RadioGroup from './RadioGroup.vue';
import type RadioButton from './RadioButton.vue';

export type RadioSize = ComponentSize;

// Radio
export const radioProps = {
  modelValue: {
    type: [String, Number, Boolean],
    default: '',
  },
  name: {
    type: String,
    default: '',
  },
  border: Boolean,
  // basic props
  size: {
    type: String as PropType<RadioSize>,
  },
  disabled: Boolean,
  label: {
    type: [String, Number, Boolean],
    default: '',
  },
};

export const radioEmits = {
  [UPDATE_MODEL_EVENT]: (val: string | number | boolean) => isString(val) || isNumber(val) || isBoolean(val),
  [CHANGE_EVENT]: (val: string | number | boolean) => isString(val) || isNumber(val) || isBoolean(val),
};

// RadioGroup
export const radioGroupProps = {
  size: {
    type: String as PropType<RadioSize>,
  },
  disabled: Boolean,
  modelValue: {
    type: [String, Number, Boolean],
    default: '',
  },
  fill: {
    type: String,
    default: '',
  },
  textColor: {
    type: String,
    default: '',
  },
};

export const radioGroupEmits = radioEmits;

// RadioButton
export const radioButtonProps = {
  name: {
    type: String,
    default: '',
  },
  size: {
    type: String as PropType<RadioSize>,
  },
  disabled: Boolean,
  modelValue: {
    type: [String, Number, Boolean],
    default: '',
  },
  label: {
    type: [String, Number, Boolean],
    default: '',
  },
};

export const radioButtonEmits = radioEmits;

export type RadioGroupProps = ExtractPropTypes<typeof radioGroupProps>;
export type RadioGroupEmits = typeof radioGroupEmits;
export type RadioGroupInstance = InstanceType<typeof RadioGroup>;

export type RadioButtonProps = ExtractPropTypes<typeof radioButtonProps>;
export type RadioButtonEmits = typeof radioButtonEmits;
export type RadioButtonInstance = InstanceType<typeof RadioButton>;

export type RadioProps = ExtractPropTypes<typeof radioProps>;
export type RadioEmits = typeof radioEmits;
export type RadioInstance = InstanceType<typeof Radio>;
