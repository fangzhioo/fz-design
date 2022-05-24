import { commonPickerProps } from '@fzui/components/TimePicker';
import { FormatType } from '@fzui/components/TimePicker/src/common/CommonPicker';
import { UPDATE_MODEL_EVENT } from '@fzui/constants';
import { Dayjs } from 'dayjs';
import { ExtractPropTypes, PropType } from 'vue';
import type DatePicker from './DatePicker.vue';
// 'date' | 'week' | 'year' | 'month' | 'datetime' | 'monthrange' | 'daterange' | 'datetimerange';
export type DatePickerType = FormatType; // & dates
type DateCellType = 'normal' | 'today' | 'week' | 'next-month' | 'prev-month';

export interface DateCell {
  column?: number;
  customClass?: string;
  disabled?: boolean;
  end?: boolean;
  inRange?: boolean;
  row?: number;
  selected?: Dayjs;
  isCurrent?: boolean;
  isSelected?: boolean;
  start?: boolean;
  text?: number;
  timestamp?: number;
  date?: Date;
  dayjs?: Dayjs;
  type?: DateCellType;
}

export const datePickerProps = {
  ...commonPickerProps,
  type: {
    type: String as PropType<DatePickerType>,
    default: 'date',
  },
};

export const datePickerEmits = [UPDATE_MODEL_EVENT];

export type DatePickerProps = ExtractPropTypes<typeof datePickerProps>;
export type DatePickerEmits = typeof datePickerEmits;
export type DatePickerInstance = InstanceType<typeof DatePicker>;
