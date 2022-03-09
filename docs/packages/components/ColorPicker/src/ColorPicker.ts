import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '@fzui/constants';
import { ComponentSize } from '@fzui/hooks';
import { ComputedRef, ExtractPropTypes, PropType } from 'vue';
import type ColorPicker from './ColorPicker.vue';

export interface IUseOptions {
  currentColor: ComputedRef<string>;
}

type ColorPickerSize = ComponentSize;

export const colorPickerProps = {
  modelValue: String,
  showAlpha: Boolean,
  colorFormat: {
    type: String,
    default: '',
  },
  disabled: Boolean,
  size: {
    type: String as PropType<ColorPickerSize>,
    // validator: isValidComponentSize,
  },
  popperClass: String,
  predefine: {
    type: Array as PropType<string[]>,
  },
};

export const colorPickerEmits = ['active-change', UPDATE_MODEL_EVENT, CHANGE_EVENT];

export type ColorPickerProps = ExtractPropTypes<typeof colorPickerProps>;
export type ColorPickerEmits = typeof colorPickerEmits;
export type ColorPickerInstance = InstanceType<typeof ColorPicker>;
