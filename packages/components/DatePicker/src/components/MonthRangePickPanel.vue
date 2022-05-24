<template>
  <div
    class="fz-picker-panel fz-date-range-picker"
    :class="[
      {
        'has-sidebar': $slots.sidebar || hasShortcuts,
      },
    ]"
  >
    <div class="fz-picker-panel__body-wrapper">
      <slot name="sidebar" class="fz-picker-panel__sidebar" />
      <div v-if="hasShortcuts" class="fz-picker-panel__sidebar">
        <button v-for="(shortcut, key) in shortcuts" :key="key" type="button" class="fz-picker-panel__shortcut" @click="handleShortcutClick(shortcut)">
          {{ shortcut.text }}
        </button>
      </div>
      <div class="fz-picker-panel__body">
        <div class="fz-picker-panel__content fz-date-range-picker__content is-left">
          <div class="fz-date-range-picker__header">
            <button type="button" class="fz-picker-panel__icon-btn d-arrow-left" @click="leftPrevYear">
              <fz-icon><d-arrow-left /></fz-icon>
            </button>
            <button
              v-if="unlinkPanels"
              type="button"
              :disabled="!enableYearArrow"
              :class="{ 'is-disabled': !enableYearArrow }"
              class="fz-picker-panel__icon-btn d-arrow-right"
              @click="leftNextYear"
            >
              <fz-icon><d-arrow-right /></fz-icon>
            </button>
            <div>{{ leftLabel }}</div>
          </div>
          <month-table
            selection-mode="range"
            :date="leftDate"
            :min-date="minDate"
            :max-date="maxDate"
            :range-state="rangeState"
            :disabled-date="disabledDate"
            @changerange="handleChangeRange"
            @pick="handleRangePick"
            @select="onSelect"
          />
        </div>
        <div class="fz-picker-panel__content fz-date-range-picker__content is-right">
          <div class="fz-date-range-picker__header">
            <button
              v-if="unlinkPanels"
              type="button"
              :disabled="!enableYearArrow"
              :class="{ 'is-disabled': !enableYearArrow }"
              class="fz-picker-panel__icon-btn d-arrow-left"
              @click="rightPrevYear"
            >
              <fz-icon><d-arrow-left /></fz-icon>
            </button>
            <button type="button" class="fz-picker-panel__icon-btn d-arrow-right" @click="rightNextYear">
              <fz-icon><d-arrow-right /></fz-icon>
            </button>
            <div>{{ rightLabel }}</div>
          </div>
          <month-table
            selection-mode="range"
            :date="rightDate"
            :min-date="minDate"
            :max-date="maxDate"
            :range-state="rangeState"
            :disabled-date="disabledDate"
            @changerange="handleChangeRange"
            @pick="handleRangePick"
            @select="onSelect"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject, ref, toRef, watch } from 'vue';
import dayjs from 'dayjs';
import { useLocale } from '@fzui/hooks';
import { Icon } from '@fzui/components';
import { FZ_PICKER_BASE_INJECT_KEY } from '@fzui/constants';
import MonthTable from './BasicMonthTable.vue';

import type { Nullable } from '@fzui/utils';
import type { PropType } from 'vue';
import type { Dayjs } from 'dayjs';

export default defineComponent({
  name: 'MonthRangePickPanel',
  components: { MonthTable, FzIcon: Icon },

  props: {
    unlinkPanels: Boolean,
    parsedValue: {
      type: Array as PropType<Dayjs[]>,
    },
  },

  emits: ['pick', 'set-picker-option'],

  setup(props, ctx) {
    const { t, lang } = useLocale();
    const leftDate = ref(dayjs().locale(lang.value));
    const rightDate = ref(dayjs().locale(lang.value).add(1, 'year'));

    const hasShortcuts = computed(() => !!shortcuts.length);

    const handleShortcutClick = (shortcut: any) => {
      const shortcutValues = typeof shortcut.value === 'function' ? shortcut.value() : shortcut.value;
      if (shortcutValues) {
        ctx.emit('pick', [dayjs(shortcutValues[0]).locale(lang.value), dayjs(shortcutValues[1]).locale(lang.value)]);
        return;
      }
      if (shortcut.onClick) {
        shortcut.onClick(ctx);
      }
    };

    const leftPrevYear = () => {
      leftDate.value = leftDate.value.subtract(1, 'year');
      if (!props.unlinkPanels) {
        rightDate.value = rightDate.value.subtract(1, 'year');
      }
    };

    const rightNextYear = () => {
      if (!props.unlinkPanels) {
        leftDate.value = leftDate.value.add(1, 'year');
      }
      rightDate.value = rightDate.value.add(1, 'year');
    };

    const leftNextYear = () => {
      leftDate.value = leftDate.value.add(1, 'year');
    };

    const rightPrevYear = () => {
      rightDate.value = rightDate.value.subtract(1, 'year');
    };
    const leftLabel = computed(() => {
      return `${leftDate.value.year()} ${t('fz.datepicker.year')}`;
    });

    const rightLabel = computed(() => {
      return `${rightDate.value.year()} ${t('fz.datepicker.year')}`;
    });

    const leftYear = computed(() => {
      return leftDate.value.year();
    });

    const rightYear = computed(() => {
      return rightDate.value.year() === leftDate.value.year() ? leftDate.value.year() + 1 : rightDate.value.year();
    });

    const enableYearArrow = computed(() => {
      return props.unlinkPanels && rightYear.value > leftYear.value + 1;
    });

    const minDate = ref<Nullable<Dayjs>>(null);
    const maxDate = ref<Nullable<Dayjs>>(null);

    const rangeState = ref({
      endDate: null,
      selecting: false,
    });

    const handleChangeRange = (val: any) => {
      rangeState.value = val;
    };

    const handleRangePick = (val: any, close = true) => {
      // const defaultTime = props.defaultTime || []
      // const minDate_ = modifyWithTimeString(val.minDate, defaultTime[0])
      // const maxDate_ = modifyWithTimeString(val.maxDate, defaultTime[1])
      // todo
      const minDate_ = val.minDate;
      const maxDate_ = val.maxDate;
      if (maxDate.value === maxDate_ && minDate.value === minDate_) {
        return;
      }
      maxDate.value = maxDate_;
      minDate.value = minDate_;

      if (!close) return;
      handleConfirm();
    };

    const isValidValue = (value: any) => {
      return Array.isArray(value) && value && value[0] && value[1] && value[0].valueOf() <= value[1].valueOf();
    };

    const handleConfirm = (visible = false) => {
      if (isValidValue([minDate.value, maxDate.value])) {
        ctx.emit('pick', [minDate.value, maxDate.value], visible);
      }
    };

    const onSelect = (selecting: any) => {
      rangeState.value.selecting = selecting;
      if (!selecting) {
        rangeState.value.endDate = null;
      }
    };

    const formatToString = (value: Dayjs[]) => {
      return value.map((_) => _.format(format));
    };

    const getDefaultValue = () => {
      let start: Dayjs;
      if (Array.isArray(defaultValue.value)) {
        const left = dayjs(defaultValue.value[0]);
        let right = dayjs(defaultValue.value[1]);
        if (!props.unlinkPanels) {
          right = left.add(1, 'year');
        }
        return [left, right];
      } else if (defaultValue.value) {
        start = dayjs(defaultValue.value);
      } else {
        start = dayjs();
      }
      start = start.locale(lang.value);
      return [start, start.add(1, 'year')];
    };

    // pickerBase.hub.emit('SetPickerOption', ['isValidValue', isValidValue])
    ctx.emit('set-picker-option', ['formatToString', formatToString]);
    const pickerBase = inject(FZ_PICKER_BASE_INJECT_KEY) as any;
    const { shortcuts, disabledDate, format } = pickerBase.props;
    const defaultValue = toRef(pickerBase.props, 'defaultValue');

    watch(
      () => defaultValue.value,
      (val) => {
        if (val) {
          const defaultArr = getDefaultValue();
          leftDate.value = defaultArr[0];
          rightDate.value = defaultArr[1];
        }
      },
      { immediate: true },
    );

    watch(
      () => props.parsedValue,
      (newVal) => {
        if (newVal && newVal.length === 2) {
          minDate.value = newVal[0];
          maxDate.value = newVal[1];
          leftDate.value = minDate.value;
          if (props.unlinkPanels && maxDate.value) {
            const minDateYear = minDate.value.year();
            const maxDateYear = maxDate.value.year();
            rightDate.value = minDateYear === maxDateYear ? maxDate.value.add(1, 'year') : maxDate.value;
          } else {
            rightDate.value = leftDate.value.add(1, 'year');
          }
        } else {
          const defaultArr = getDefaultValue();
          minDate.value = null;
          maxDate.value = null;
          leftDate.value = defaultArr[0];
          rightDate.value = defaultArr[1];
        }
      },
      { immediate: true },
    );

    return {
      shortcuts,
      disabledDate,
      onSelect,
      handleRangePick,
      rangeState,
      handleChangeRange,
      minDate,
      maxDate,
      enableYearArrow,
      leftLabel,
      rightLabel,
      leftNextYear,
      leftPrevYear,
      rightNextYear,
      rightPrevYear,
      t,
      leftDate,
      rightDate,
      hasShortcuts,
      handleShortcutClick,
    };
  },
});
</script>
