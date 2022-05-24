<script lang="ts">
import { defineComponent, h, provide, ref, renderSlot } from 'vue';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';
import advancedFormat from 'dayjs/plugin/advancedFormat.js';
import localeData from 'dayjs/plugin/localeData.js';
import weekOfYear from 'dayjs/plugin/weekOfYear.js';
import weekYear from 'dayjs/plugin/weekYear.js';
import dayOfYear from 'dayjs/plugin/dayOfYear.js';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter.js';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore.js';
import { CommonPicker, DEFAULT_FORMATS_DATE, DEFAULT_FORMATS_DATEPICKER } from '@fzui/components/TimePicker';
import { FZ_PICKER_DATE_INJECT_KEY, FZ_POPPER_OPTIONS_INJECT_KEY, UPDATE_MODEL_EVENT } from '@fzui/constants';
import DatePickPanel from './components/DatePickPanel.vue';
import DateRangePickPanel from './components/DateRangePickPanel.vue';
import MonthRangePickPanel from './components/MonthRangePickPanel.vue';
import { datePickerEmits, datePickerProps } from './DatePicker';
import type { DatePickerType } from './DatePicker';
import { CommonPickerInstance } from '@fzui/components/TimePicker/src/common/CommonPicker';

dayjs.extend(localeData);
dayjs.extend(advancedFormat);
dayjs.extend(customParseFormat);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);
dayjs.extend(dayOfYear);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const getPanel = function (type: DatePickerType) {
  if (type === 'daterange' || type === 'datetimerange') {
    return DateRangePickPanel;
  } else if (type === 'monthrange') {
    return MonthRangePickPanel;
  }
  return DatePickPanel;
};

export default defineComponent({
  name: 'FzDatePicker',
  install: null,
  props: datePickerProps,
  emits: datePickerEmits,
  setup(props, ctx) {
    provide(FZ_POPPER_OPTIONS_INJECT_KEY, props.popperOptions);
    provide(FZ_PICKER_DATE_INJECT_KEY, {
      ctx,
    });
    const commonPicker = ref<CommonPickerInstance>();
    const refProps = {
      ...props,
      focus: (focusStartInput = true) => {
        commonPicker.value?.focus(focusStartInput);
      },
    };
    ctx.expose(refProps);
    return () => {
      // since props always have all defined keys on it, {format, ...props} will always overwrite format
      // pick props.format or provide default value here before spreading
      const format = props.format ?? (DEFAULT_FORMATS_DATEPICKER[props.type] || DEFAULT_FORMATS_DATE);
      return h(
        CommonPicker,
        {
          ...props,
          format,
          type: props.type,
          ref: commonPicker,
          'onUpdate:modelValue': (value) => ctx.emit(UPDATE_MODEL_EVENT, value),
        },
        {
          default: (scopedProps: any) => h(getPanel(props.type), scopedProps),
          'range-separator': () => renderSlot(ctx.slots, 'range-separator'),
        },
      );
    };
  },
});
</script>
