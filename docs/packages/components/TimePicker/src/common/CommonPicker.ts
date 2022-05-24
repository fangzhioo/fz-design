import { PopperjsCoreOptions } from '@fzui/components';
import { ExtractPropTypes, PropType } from 'vue';

import type { ComponentSize } from '@fzui/hooks';
import type CommonPicker from './CommonPicker.vue';
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '@fzui/constants';

export type FormatType = 'date' | 'dates' | 'week' | 'year' | 'month' | 'datetime' | 'monthrange' | 'daterange' | 'datetimerange';
export type PickerSize = ComponentSize;
export type PickerModelValue = number | string | Date | (number | string | Date)[];

export const commonPickerProps = {
  id: {
    type: [Array, String] as PropType<string | string[]>,
  },
  name: {
    type: [Array, String] as PropType<string | string[]>,
    default: '',
  },
  popperClass: {
    type: String,
    default: '',
  },
  format: {
    type: String,
  },
  valueFormat: {
    type: String as PropType<string>,
  },
  type: {
    type: String,
    default: '',
  },
  clearable: {
    type: Boolean,
    default: true,
  },
  clearIcon: {
    type: String,
    default: 'close',
  },
  editable: {
    type: Boolean,
    default: true,
  },
  prefixIcon: {
    type: String,
    default: '',
  },
  size: {
    type: String as PropType<PickerSize>,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: '',
  },
  popperOptions: {
    type: Object as PropType<Partial<PopperjsCoreOptions>>,
    default: () => ({}),
  },
  modelValue: {
    type: [Date, Array, String, Number] as PropType<PickerModelValue>,
    default: '',
  },
  rangeSeparator: {
    type: String,
    default: '-',
  },
  startPlaceholder: String,
  endPlaceholder: String,
  defaultValue: {
    type: [Date, Array] as PropType<Date | Date[]>,
  },
  defaultTime: {
    type: [Date, Array] as PropType<Date | Date[]>,
  },
  isRange: {
    type: Boolean,
    default: false,
  },
  disabledHours: {
    type: Function,
  },
  disabledMinutes: {
    type: Function,
  },
  disabledSeconds: {
    type: Function,
  },
  disabledDate: {
    type: Function,
  },
  cellClassName: {
    type: Function,
  },
  shortcuts: {
    type: Array,
    default: () => [],
  },
  arrowControl: {
    type: Boolean,
    default: false,
  },
  validateEvent: {
    type: Boolean,
    default: true,
  },
  unlinkPanels: Boolean,
};

export const commonPickerEmits = [UPDATE_MODEL_EVENT, CHANGE_EVENT, 'focus', 'blur', 'calendar-change', 'panel-change', 'visible-change'];

export type CommonPickerProps = ExtractPropTypes<typeof commonPickerProps>;
export type CommonPickerEmits = typeof commonPickerEmits;
export type CommonPickerInstance = InstanceType<typeof CommonPicker>;
