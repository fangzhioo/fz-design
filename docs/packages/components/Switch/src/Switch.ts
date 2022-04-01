import { CHANGE_EVENT, INPUT_EVENT, UPDATE_MODEL_EVENT } from '@fzui/constants';
import { ComponentSize } from '@fzui/hooks';
import { isBoolean, isNumber, isString } from '@fzui/utils';
import { ExtractPropTypes, PropType } from 'vue';
import type Switch from './Switch.vue';

export type SwitchSize = ComponentSize;

export const switchEmits = {
  [UPDATE_MODEL_EVENT]: (val: boolean | string | number) => isBoolean(val) || isString(val) || isNumber(val),
  [CHANGE_EVENT]: (val: boolean | string | number) => isBoolean(val) || isString(val) || isNumber(val),
  [INPUT_EVENT]: (val: boolean | string | number) => isBoolean(val) || isString(val) || isNumber(val),
};

export const switchProps = {
  modelValue: {
    type: [Boolean, String, Number],
    default: false,
  },
  value: {
    type: [Boolean, String, Number],
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  width: {
    type: Number,
    default: 40,
  },
  inlinePrompt: {
    type: Boolean,
    default: false,
  },
  activeIcon: {
    type: String,
    default: '',
  },
  inactiveIcon: {
    type: String,
    default: '',
  },
  activeText: {
    type: String,
    default: '',
  },
  inactiveText: {
    type: String,
    default: '',
  },
  activeColor: {
    type: String,
    default: '',
  },
  inactiveColor: {
    type: String,
    default: '',
  },
  borderColor: {
    type: String,
    default: '',
  },
  activeValue: {
    type: [Boolean, String, Number],
    default: true,
  },
  inactiveValue: {
    type: [Boolean, String, Number],
    default: false,
  },
  name: {
    type: String,
    default: '',
  },
  validateEvent: {
    type: Boolean,
    default: true,
  },
  id: String,
  loading: {
    type: Boolean,
    default: false,
  },
  beforeChange: {
    type: Function as PropType<() => Promise<boolean> | boolean>,
  },
  size: {
    type: String as PropType<SwitchSize>,
  },
};

export type SwitchProps = ExtractPropTypes<typeof switchProps>;
export type SwitchEmits = typeof switchEmits;
export type SwitchInstance = InstanceType<typeof Switch>;
