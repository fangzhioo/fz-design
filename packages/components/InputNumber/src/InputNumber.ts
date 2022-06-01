import { BLUR_EVENT, CHANGE_EVENT, FOCUS_EVENT, INPUT_EVENT, UPDATE_MODEL_EVENT } from '@fzui/constants';
import { ComponentSize } from '@fzui/hooks';
import { isNil, isNumber } from '@fzui/utils';
import { ExtractPropTypes, PropType } from 'vue';
import type InputNumber from './InputNumber.vue';

export type InputNumberSize = ComponentSize;

export interface IData {
  currentValue: number | null | undefined;
  userInput: null | number | string;
}

export const inputNumberProps = {
  id: {
    type: String,
    default: undefined,
  },
  step: {
    type: Number,
    default: 1,
  },
  stepStrictly: {
    type: Boolean,
    default: false,
  },
  max: {
    type: Number,
    default: Number.POSITIVE_INFINITY,
  },
  min: {
    type: Number,
    default: Number.NEGATIVE_INFINITY,
  },
  modelValue: {
    type: Number,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String as PropType<InputNumberSize>,
  },
  controls: {
    type: Boolean,
    default: true,
  },
  controlsPosition: {
    type: String as PropType<'' | 'right'>,
    default: '',
  },
  valueOnClear: {
    type: [String, Number] as PropType<string | number | null>,
    validator: (val: 'min' | 'max' | number | null) => val === null || isNumber(val) || ['min', 'max'].includes(val),
    default: null,
  },
  name: String,
  label: String,
  placeholder: String,
  precision: {
    type: Number,
    validator: (val: number) => val >= 0 && val === Number.parseInt(`${val}`, 10),
  },
};

export const inputNumberEmits = {
  [CHANGE_EVENT]: (prev: number | null | undefined, cur: number | null | undefined) => prev !== cur,
  [BLUR_EVENT]: (e: FocusEvent) => e instanceof FocusEvent,
  [FOCUS_EVENT]: (e: FocusEvent) => e instanceof FocusEvent,
  [INPUT_EVENT]: (val: number | null | undefined) => isNumber(val) || isNil(val),
  [UPDATE_MODEL_EVENT]: (val: number | null | undefined) => isNumber(val) || isNil(val),
};

export type InputNumberProps = ExtractPropTypes<typeof inputNumberProps>;
export type InputNumberEmits = typeof inputNumberEmits;
export type InputNumberInstance = InstanceType<typeof InputNumber>;
