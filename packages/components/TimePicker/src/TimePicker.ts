import { UPDATE_MODEL_EVENT } from '@fzui/constants';
import { ExtractPropTypes } from 'vue';
import { commonPickerProps } from './common/CommonPicker';
import type TimePicker from './TimePicker.vue';

export const timePickerProps = {
  ...commonPickerProps,
  isRange: {
    type: Boolean,
    default: false,
  },
};

export const timePickerEmits = [UPDATE_MODEL_EVENT];

export type TimePickerProps = ExtractPropTypes<typeof timePickerProps>;
export type TimePickerEmits = typeof timePickerEmits;
export type TimePickerInstance = InstanceType<typeof TimePicker>;
