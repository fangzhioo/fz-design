<template>
  <div class="fz-calendar">
    <div class="fz-calendar__header">
      <slot name="header" :date="i18nDate">
        <div class="fz-calendar__title">{{ i18nDate }}</div>
        <div v-if="validatedRange.length === 0" class="fz-calendar__button-group">
          <fz-button-group>
            <fz-button size="mini" @click="selectDate('prev-month')">
              {{ t('fz.datepicker.prevMonth') }}
            </fz-button>
            <fz-button size="mini" @click="selectDate('today')">
              {{ t('fz.datepicker.today') }}
            </fz-button>
            <fz-button size="mini" @click="selectDate('next-month')">
              {{ t('fz.datepicker.nextMonth') }}
            </fz-button>
          </fz-button-group>
        </div>
      </slot>
    </div>
    <div v-if="validatedRange.length === 0" class="fz-calendar__body">
      <date-table :date="date" :selected-day="realSelectedDay" @pick="pickDay">
        <template v-if="$slots.dateCell" #dateCell="data">
          <slot name="dateCell" v-bind="data"></slot>
        </template>
      </date-table>
    </div>
    <div v-else class="fz-calendar__body">
      <date-table
        v-for="(range_, index) in validatedRange"
        :key="index"
        :date="range_[0]"
        :selected-day="realSelectedDay"
        :range="range_"
        :hide-header="index !== 0"
        @pick="pickDay"
      >
        <template v-if="$slots.dateCell" #dateCell="data">
          <slot name="dateCell" v-bind="data"></slot>
        </template>
      </date-table>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, ref } from 'vue';
import dayjs from 'dayjs';
import { useLocale } from '@fzui/hooks';
import { debugWarn } from '@fzui/utils';
import { Button, ButtonGroup } from '@fzui/components';
import { CalendarDateType, calendarEmits, calendarProps } from './Calendar';
import DateTable from './DateTable.vue';

import type { Dayjs } from 'dayjs';

// 当日期自动推算周开始日，一些月初的日期有可能会推算到上个月，这时候就会导致数据出现跨月的情况，跨月的数据格式需要单独处理一下才能被正常渲染。
// Calculate the validate date range according to the start and end dates
const calculateValidatedDateRange = (startDayjs: Dayjs, endDayjs: Dayjs): [Dayjs, Dayjs][] => {
  const firstDay = startDayjs.startOf('week');
  const lastDay = endDayjs.endOf('week');
  const firstMonth = firstDay.get('month');
  const lastMonth = lastDay.get('month');

  // Current mouth
  if (firstMonth === lastMonth) {
    return [[firstDay, lastDay]];
  }
  // Two adjacent months
  else if (firstMonth + 1 === lastMonth) {
    const firstMonthLastDay = firstDay.endOf('month');
    const lastMonthFirstDay = lastDay.startOf('month');

    // Whether the last day of the first month and the first day of the last month is in the same week
    const isSameWeek = firstMonthLastDay.isSame(lastMonthFirstDay, 'week');
    const lastMonthStartDay = isSameWeek ? lastMonthFirstDay.add(1, 'week') : lastMonthFirstDay;

    return [
      [firstDay, firstMonthLastDay],
      [lastMonthStartDay.startOf('week'), lastDay],
    ];
  }
  // Three consecutive months (compatible: 2021-01-30 to 2021-02-28)
  else if (firstMonth + 2 === lastMonth) {
    const firstMonthLastDay = firstDay.endOf('month');
    const secondMonthFirstDay = firstDay.add(1, 'month').startOf('month');

    // Whether the last day of the first month and the second month is in the same week
    const secondMonthStartDay = firstMonthLastDay.isSame(secondMonthFirstDay, 'week') ? secondMonthFirstDay.add(1, 'week') : secondMonthFirstDay;

    const secondMonthLastDay = secondMonthStartDay.endOf('month');
    const lastMonthFirstDay = lastDay.startOf('month');

    // Whether the last day of the second month and the last day of the last month is in the same week
    const lastMonthStartDay = secondMonthLastDay.isSame(lastMonthFirstDay, 'week') ? lastMonthFirstDay.add(1, 'week') : lastMonthFirstDay;

    return [
      [firstDay, firstMonthLastDay],
      [secondMonthStartDay.startOf('week'), secondMonthLastDay],
      [lastMonthStartDay.startOf('week'), lastDay],
    ];
  }
  // Other cases

  debugWarn('FzCalendar', 'start time and end time interval must not exceed two months');
  return [];
};

export default defineComponent({
  name: 'FzCalendar',
  components: {
    DateTable,
    FzButton: Button,
    FzButtonGroup: ButtonGroup,
  },
  props: calendarProps,
  emits: calendarEmits,
  setup(props, { emit }) {
    const { t, lang } = useLocale();
    const selectedDay = ref<Dayjs>();
    const now = dayjs().locale(lang.value);

    // if range is valid, we get a two-digit array
    const validatedRange = computed(() => {
      if (!props.range) {
        return [];
      }
      const rangeArrDayjs = props.range.map((_) => dayjs(_).locale(lang.value));
      const [startDayjs, endDayjs] = rangeArrDayjs;
      if (startDayjs.isAfter(endDayjs)) {
        debugWarn('FzCalendar', 'end time should be greater than start time');
        return [];
      }
      if (startDayjs.isSame(endDayjs, 'month')) {
        // same month
        return calculateValidatedDateRange(startDayjs, endDayjs);
      }
      // two months
      if (startDayjs.add(1, 'month').month() !== endDayjs.month()) {
        debugWarn('FzCalendar', 'start time and end time interval must not exceed two months');
        return [];
      }
      return calculateValidatedDateRange(startDayjs, endDayjs);
    });

    const date: ComputedRef<Dayjs> = computed(() => {
      if (!props.modelValue) {
        // eslint-disable-next-line no-use-before-define
        if (realSelectedDay.value) {
          // eslint-disable-next-line no-use-before-define
          return realSelectedDay.value;
        } else if (validatedRange.value.length) {
          return validatedRange.value[0][0];
        }
        return now;
      }
      return dayjs(props.modelValue).locale(lang.value);
    });

    const realSelectedDay = computed<Dayjs | undefined>({
      get() {
        if (!props.modelValue) {
          return selectedDay.value;
        }
        return date.value;
      },
      set(val) {
        if (!val) {
          return;
        }
        selectedDay.value = val;
        const result = val.toDate();

        emit('input', result);
        emit('update:modelValue', result);
      },
    });

    const prevMonthDayjs = computed(() => {
      return date.value.subtract(1, 'month');
    });
    const curMonthDatePrefix = computed(() => {
      return dayjs(date.value).locale(lang.value).format('YYYY-MM');
    });

    const nextMonthDayjs = computed(() => {
      return date.value.add(1, 'month');
    });

    const prevYearDayjs = computed(() => {
      return date.value.subtract(1, 'year');
    });

    const nextYearDayjs = computed(() => {
      return date.value.add(1, 'year');
    });

    const i18nDate = computed(() => {
      const pickedMonth = `fz.datepicker.month${date.value.format('M')}`;
      return `${date.value.year()} ${t('fz.datepicker.year')} ${t(pickedMonth)}`;
    });

    const pickDay = (day: Dayjs) => {
      realSelectedDay.value = day;
    };

    const selectDate = (type: CalendarDateType) => {
      let day: Dayjs = now;
      if (type === 'prev-month') {
        day = prevMonthDayjs.value;
      } else if (type === 'next-month') {
        day = nextMonthDayjs.value;
      } else if (type === 'prev-year') {
        day = prevYearDayjs.value;
      } else if (type === 'next-year') {
        day = nextYearDayjs.value;
      }

      if (day.isSame(date.value, 'day')) {
        return;
      }
      pickDay(day);
    };

    return {
      selectedDay,
      curMonthDatePrefix,
      i18nDate,
      realSelectedDay,
      date,
      validatedRange,
      pickDay,
      selectDate,
      t,
    };
  },
});
</script>
