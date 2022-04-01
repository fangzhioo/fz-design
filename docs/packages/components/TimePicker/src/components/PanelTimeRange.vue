<template>
  <div v-if="actualVisible" class="fz-time-range-picker fz-picker-panel">
    <div class="fz-time-range-picker__content">
      <div class="fz-time-range-picker__cell">
        <div class="fz-time-range-picker__header">
          {{ t('fz.datepicker.startTime') }}
        </div>
        <div :class="{ 'has-seconds': showSeconds, 'is-arrow': arrowControl }" class="fz-time-range-picker__body fz-time-panel__content">
          <time-spinner
            ref="minSpinner"
            role="start"
            :show-seconds="showSeconds"
            :am-pm-mode="amPmMode"
            :arrow-control="arrowControl"
            :spinner-date="minDate"
            :disabled-hours="disabledHours_"
            :disabled-minutes="disabledMinutes_"
            :disabled-seconds="disabledSeconds_"
            @change="handleMinChange"
            @set-option="onSetOption"
            @select-range="setMinSelectionRange"
          />
        </div>
      </div>
      <div class="fz-time-range-picker__cell">
        <div class="fz-time-range-picker__header">
          {{ t('fz.datepicker.endTime') }}
        </div>
        <div :class="{ 'has-seconds': showSeconds, 'is-arrow': arrowControl }" class="fz-time-range-picker__body fz-time-panel__content">
          <time-spinner
            ref="maxSpinner"
            role="end"
            :show-seconds="showSeconds"
            :am-pm-mode="amPmMode"
            :arrow-control="arrowControl"
            :spinner-date="maxDate"
            :disabled-hours="disabledHours_"
            :disabled-minutes="disabledMinutes_"
            :disabled-seconds="disabledSeconds_"
            @change="handleMaxChange"
            @set-option="onSetOption"
            @select-range="setMaxSelectionRange"
          />
        </div>
      </div>
    </div>
    <div class="fz-time-panel__footer">
      <button type="button" class="fz-time-panel__btn cancel" @click="handleCancel()">
        {{ t('fz.datepicker.cancel') }}
      </button>
      <button type="button" class="fz-time-panel__btn confirm" :disabled="btnConfirmDisabled" @click="handleConfirm()">
        {{ t('fz.datepicker.confirm') }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, inject } from 'vue';
import dayjs from 'dayjs';
import { union } from '@fzui/utils';
import { useLocale } from '@fzui/hooks';
import { EVENT_CODE, FZ_PICKER_BASE_INJECT_KEY } from '@fzui/constants';
import TimeSpinner from './BasicTimeSpinner.vue';
import { getAvailableArrs, useOldValue } from './useTimePicker';

import type { PropType } from 'vue';
import type { Dayjs } from 'dayjs';

const makeSelectRange = (start: number, end: number) => {
  const result = [];
  for (let i = start; i <= end; i++) {
    result.push(i);
  }
  return result;
};
export default defineComponent({
  components: { TimeSpinner },

  props: {
    visible: Boolean,
    actualVisible: Boolean,
    parsedValue: {
      type: [Array] as PropType<Array<Dayjs>>,
      default: () => [],
    },
    format: {
      type: String,
      default: '',
    },
  },

  emits: ['pick', 'select-range', 'set-picker-option'],

  setup(props, ctx) {
    const { t, lang } = useLocale();
    const minDate = computed(() => props.parsedValue[0]);
    const maxDate = computed(() => props.parsedValue[1]);
    const oldValue = useOldValue(props);
    const handleCancel = () => {
      ctx.emit('pick', oldValue.value, false);
    };
    const showSeconds = computed(() => {
      return props.format.includes('ss');
    });
    const amPmMode = computed(() => {
      if (props.format.includes('A')) return 'A';
      if (props.format.includes('a')) return 'a';
      return '';
    });

    const minSelectableRange = ref([]);
    const maxSelectableRange = ref([]);

    const handleConfirm = (visible = false) => {
      ctx.emit('pick', [minDate.value, maxDate.value], visible);
    };

    const handleMinChange = (date: Dayjs) => {
      handleChange(date.millisecond(0), maxDate.value);
    };
    const handleMaxChange = (date: Dayjs) => {
      handleChange(minDate.value, date.millisecond(0));
    };

    const isValidValue = (_date: Dayjs[]) => {
      const parsedDate = _date.map((_) => dayjs(_).locale(lang.value));
      const result = getRangeAvailableTime(parsedDate);
      return parsedDate[0].isSame(result[0]) && parsedDate[1].isSame(result[1]);
    };

    const handleChange = (minDate: any, maxDate: any) => {
      // todo getRangeAvailableTime(_date).millisecond(0)
      ctx.emit('pick', [minDate, maxDate], true);
    };
    const btnConfirmDisabled = computed(() => {
      return minDate.value > maxDate.value;
    });

    const selectionRange = ref([0, 2]);
    const setMinSelectionRange = (start: any, end: any) => {
      ctx.emit('select-range', start, end, 'min');
      selectionRange.value = [start, end];
    };

    const offset = computed(() => (showSeconds.value ? 11 : 8));
    const setMaxSelectionRange = (start: any, end: any) => {
      ctx.emit('select-range', start, end, 'max');
      selectionRange.value = [start + offset.value, end + offset.value];
    };

    const changeSelectionRange = (step: number) => {
      const list = showSeconds.value ? [0, 3, 6, 11, 14, 17] : [0, 3, 8, 11];
      const mapping = ['hours', 'minutes'].concat(showSeconds.value ? ['seconds'] : []);
      const index = list.indexOf(selectionRange.value[0]);
      const next = (index + step + list.length) % list.length;
      const half = list.length / 2;
      if (next < half) {
        timePickerOptions['start_emitSelectRange'](mapping[next]);
      } else {
        timePickerOptions['end_emitSelectRange'](mapping[next - half]);
      }
    };

    const handleKeydown = (event: KeyboardEvent) => {
      const code = event.code;

      if (code === EVENT_CODE.left || code === EVENT_CODE.right) {
        const step = code === EVENT_CODE.left ? -1 : 1;
        changeSelectionRange(step);
        event.preventDefault();
        return;
      }

      if (code === EVENT_CODE.up || code === EVENT_CODE.down) {
        const step = code === EVENT_CODE.up ? -1 : 1;
        const role = selectionRange.value[0] < offset.value ? 'start' : 'end';
        timePickerOptions[`${role}_scrollDown`](step);
        event.preventDefault();
        return;
      }
    };

    const disabledHours_ = (role: string, compare: Dayjs) => {
      const defaultDisable = disabledHours ? disabledHours(role) : [];
      const isStart = role === 'start';
      const compareDate = compare || (isStart ? maxDate.value : minDate.value);
      const compareHour = compareDate.hour();
      const nextDisable = isStart ? makeSelectRange(compareHour + 1, 23) : makeSelectRange(0, compareHour - 1);
      return union(defaultDisable, nextDisable);
    };
    const disabledMinutes_ = (hour: number, role: string, compare: Dayjs) => {
      const defaultDisable = disabledMinutes ? disabledMinutes(hour, role) : [];
      const isStart = role === 'start';
      const compareDate = compare || (isStart ? maxDate.value : minDate.value);
      const compareHour = compareDate.hour();
      if (hour !== compareHour) {
        return defaultDisable;
      }
      const compareMinute = compareDate.minute();
      const nextDisable = isStart ? makeSelectRange(compareMinute + 1, 59) : makeSelectRange(0, compareMinute - 1);
      return union(defaultDisable, nextDisable);
    };
    const disabledSeconds_ = (hour: number, minute: number, role: string, compare: Dayjs) => {
      const defaultDisable = disabledSeconds ? disabledSeconds(hour, minute, role) : [];
      const isStart = role === 'start';
      const compareDate = compare || (isStart ? maxDate.value : minDate.value);
      const compareHour = compareDate.hour();
      const compareMinute = compareDate.minute();
      if (hour !== compareHour || minute !== compareMinute) {
        return defaultDisable;
      }
      const compareSecond = compareDate.second();
      const nextDisable = isStart ? makeSelectRange(compareSecond + 1, 59) : makeSelectRange(0, compareSecond - 1);
      return union(defaultDisable, nextDisable);
    };

    const getRangeAvailableTime = (dates: Array<Dayjs>) => {
      return dates.map((_, index) => getRangeAvailableTimeEach(dates[0], dates[1], index === 0 ? 'start' : 'end'));
    };

    const { getAvailableHours, getAvailableMinutes, getAvailableSeconds } = getAvailableArrs(disabledHours_, disabledMinutes_, disabledSeconds_);

    const getRangeAvailableTimeEach = (startDate: Dayjs, endDate: Dayjs, role: string) => {
      const availableMap: any = {
        hour: getAvailableHours,
        minute: getAvailableMinutes,
        second: getAvailableSeconds,
      };
      const isStart = role === 'start';
      let result: any = isStart ? startDate : endDate;
      const compareDate = isStart ? endDate : startDate;
      ['hour', 'minute', 'second'].forEach((k) => {
        if (availableMap[k]) {
          let availableArr;
          const method = availableMap[k];
          if (k === 'minute') {
            availableArr = method(result.hour(), role, compareDate);
          } else if (k === 'second') {
            availableArr = method(result.hour(), result.minute(), role, compareDate);
          } else {
            availableArr = method(role, compareDate);
          }
          if (availableArr && availableArr.length && !availableArr.includes(result[k]())) {
            const pos = isStart ? 0 : availableArr.length - 1;
            result = result[k](availableArr[pos]);
          }
        }
      });
      return result;
    };

    const parseUserInput = (value: Dayjs[] | Dayjs) => {
      if (!value) return null;
      if (Array.isArray(value)) {
        return value.map((_) => dayjs(_, props.format).locale(lang.value));
      }
      return dayjs(value, props.format).locale(lang.value);
    };

    const formatToString = (value: Dayjs[] | Dayjs) => {
      if (!value) return null;
      if (Array.isArray(value)) {
        return value.map((_) => _.format(props.format));
      }
      return value.format(props.format);
    };

    const getDefaultValue = () => {
      if (Array.isArray(defaultValue)) {
        return defaultValue.map((_) => dayjs(_).locale(lang.value));
      }
      const defaultDay = dayjs(defaultValue).locale(lang.value);
      return [defaultDay, defaultDay.add(60, 'm')];
    };

    ctx.emit('set-picker-option', ['formatToString', formatToString]);
    ctx.emit('set-picker-option', ['parseUserInput', parseUserInput]);
    ctx.emit('set-picker-option', ['isValidValue', isValidValue]);
    ctx.emit('set-picker-option', ['handleKeydown', handleKeydown]);
    ctx.emit('set-picker-option', ['getDefaultValue', getDefaultValue]);
    ctx.emit('set-picker-option', ['getRangeAvailableTime', getRangeAvailableTime]);

    const timePickerOptions = {} as any;
    const onSetOption = (e: any) => {
      timePickerOptions[e[0]] = e[1];
    };

    const pickerBase = inject(FZ_PICKER_BASE_INJECT_KEY) as any;
    const { arrowControl, disabledHours, disabledMinutes, disabledSeconds, defaultValue } = pickerBase.props;

    return {
      arrowControl,
      onSetOption,
      setMaxSelectionRange,
      setMinSelectionRange,
      btnConfirmDisabled,
      handleCancel,
      handleConfirm,
      t,
      showSeconds,
      minDate,
      maxDate,
      amPmMode,
      handleMinChange,
      handleMaxChange,
      minSelectableRange,
      maxSelectableRange,
      disabledHours_,
      disabledMinutes_,
      disabledSeconds_,
    };
  },
});
</script>
