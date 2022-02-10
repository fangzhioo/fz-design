import { ExtractPropTypes, PropType } from 'vue';
import type Calendar from './Calendar.vue';
import { UPDATE_MODEL_EVENT } from '@fzui/utils/constants';

export type CalendarDateType = 'prev-month' | 'next-month' | 'prev-year' | 'next-year' | 'today';

export const calendarEmits = {
  [UPDATE_MODEL_EVENT]: (value: Date) => value instanceof Date,
  input: (value: Date) => value instanceof Date,
};

export const calendarProps = {
  modelValue: {
    type: Date,
  },
  range: {
    type: Array as PropType<Array<Date>>,
    validator: (range: unknown): range is [Date, Date] => Array.isArray(range) && range.length === 2 && range.every((item) => item instanceof Date),
  },
};

export type CalendarProps = ExtractPropTypes<typeof calendarProps>;
export type CalendarEmits = typeof calendarEmits;
export type CalendarInstance = InstanceType<typeof Calendar>;
