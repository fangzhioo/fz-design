<template>
  <fz-tooltip
    ref="refPopper"
    v-model:visible="pickerVisible"
    effect="light"
    pure
    trigger="click"
    v-bind="$attrs"
    append-to-body
    transition="fz-zoom-in-top"
    :popper-class="`fz-picker__popper ${popperClass}`"
    :popper-options="popperOptions"
    :fallback-placements="['bottom', 'top', 'right', 'left']"
    :gpu-acceleration="false"
    :stop-popper-mouse-event="false"
    :hide-after="0"
    persistent
    @before-show="onBeforeShow"
    @show="onShow"
    @hide="onHide"
  >
    <template #default>
      <fz-input
        v-if="!isRangeInput"
        :id="id"
        ref="inputRef"
        :model-value="displayValue"
        :name="name"
        :size="pickerSize"
        :disabled="pickerDisabled"
        :placeholder="placeholder"
        class="fz-date-editor"
        :class="['fz-date-editor--' + type, $attrs.class || undefined]"
        :style="$attrs.style || undefined"
        :readonly="!editable || readonly || isDatesPicker || type === 'week'"
        @input="onUserInput"
        @focus="handleFocus"
        @keydown="handleKeydown"
        @change="handleChange"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave"
        @click.stop
      >
        <template #prefix>
          <fz-icon v-if="triggerIcon" :name="triggerIcon" class="fz-input__icon" @click="handleFocus" />
        </template>
        <template #suffix>
          <fz-icon v-if="showClose && clearIcon" :name="clearIcon" class="fz-input__icon clear-icon" @click="onClearIconClick" />
        </template>
      </fz-input>
      <div
        v-else
        ref="inputRef"
        class="fz-date-editor fz-range-editor fz-input__inner"
        :class="[
          'fz-date-editor--' + type,
          pickerSize ? `fz-range-editor--${pickerSize}` : '',
          pickerDisabled ? 'is-disabled' : '',
          pickerVisible ? 'is-active' : '',
          $attrs.class || undefined,
        ]"
        :style="comStyle"
        @click="handleFocus"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave"
        @keydown="handleKeydown"
      >
        <fz-icon v-if="triggerIcon" :name="triggerIcon" class="fz-input__icon fz-range__icon" @click="handleFocus" />
        <input
          :id="id && id[0]"
          autocomplete="off"
          :name="name && name[0]"
          :placeholder="startPlaceholder"
          :value="displayValue && displayValue[0]"
          :disabled="pickerDisabled"
          :readonly="!editable || readonly"
          class="fz-range-input"
          @input="handleStartInput"
          @change="handleStartChange"
          @focus="handleFocus"
        />
        <slot name="range-separator">
          <span class="fz-range-separator">{{ rangeSeparator }}</span>
        </slot>
        <input
          :id="id && id[1]"
          autocomplete="off"
          :name="name && name[1]"
          :placeholder="endPlaceholder"
          :value="displayValue && displayValue[1]"
          :disabled="pickerDisabled"
          :readonly="!editable || readonly"
          class="fz-range-input"
          @focus="handleFocus"
          @input="handleEndInput"
          @change="handleEndChange"
        />
        <fz-icon
          v-if="clearIcon"
          :name="clearIcon"
          class="fz-input__icon fz-range__close-icon"
          :class="{
            'fz-range__close-icon--hidden': !showClose,
          }"
          @click="onClearIconClick"
        />
      </div>
    </template>
    <template #content>
      <slot
        :visible="pickerVisible"
        :actual-visible="pickerActualVisible"
        :parsed-value="parsedValue"
        :format="format"
        :unlink-panels="unlinkPanels"
        :type="type"
        :default-value="defaultValue"
        @pick="onPick"
        @select-range="setSelectionRange"
        @set-picker-option="onSetPickerOption"
        @calendar-change="onCalendarChange"
        @panel-change="onPanelChange"
        @mousedown.stop
      />
    </template>
  </fz-tooltip>
</template>
<script lang="ts">
import { defineComponent, ref, computed, nextTick, inject, watch, provide, unref } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { isEqual, debugWarn } from '@fzui/utils';
import { BLUR_EVENT, CHANGE_EVENT, EVENT_CODE, UPDATE_MODEL_EVENT, FZ_POPPER_OPTIONS_INJECT_KEY, FZ_PICKER_BASE_INJECT_KEY } from '@fzui/constants';
import { Icon, Input, PopperjsCoreOptions, Tooltip } from '@fzui/components';
import { useForm, useLocale, useSize } from '@fzui/hooks';
import { commonPickerProps, commonPickerEmits, PickerModelValue } from './CommonPicker';
import { formatter, valueEquals, parser, PickerOptions } from './util';

import type { ComponentPublicInstance } from 'vue';

export default defineComponent({
  name: 'CommonPicker',
  components: {
    FzInput: Input,
    FzTooltip: Tooltip,
    FzIcon: Icon,
  },
  props: commonPickerProps,
  emits: commonPickerEmits,
  setup(props, ctx) {
    const { lang } = useLocale();
    const { form, formItem } = useForm();
    const popperOptions = inject(FZ_POPPER_OPTIONS_INJECT_KEY, {} as PopperjsCoreOptions);

    const refPopper = ref<InstanceType<typeof Tooltip>>();
    const inputRef = ref<HTMLElement | ComponentPublicInstance>();
    const pickerVisible = ref(false);
    const pickerActualVisible = ref(false);
    const valueOnOpen = ref<PickerModelValue>();
    const userInput = ref<any>(null);

    const comStyle = computed<any>(() => ctx.attrs.style);

    watch(pickerVisible, (val) => {
      if (!val) {
        userInput.value = null;
        nextTick(() => {
          emitChange(props.modelValue);
        });
        ctx.emit(BLUR_EVENT);
        blurInput();
        if (props.validateEvent && formItem) {
          formItem.validate?.(BLUR_EVENT).catch((err) => debugWarn(err));
        }
      } else {
        valueOnOpen.value = props.modelValue;
      }
    });
    const emitChange = (val: any, isClear?: boolean) => {
      // determine user real change only
      if (isClear || !valueEquals(val, valueOnOpen.value)) {
        ctx.emit(CHANGE_EVENT, val);
        if (props.validateEvent && formItem) {
          formItem.validate?.(CHANGE_EVENT).catch((err) => debugWarn(err));
        }
      }
    };
    const emitInput = (val: any) => {
      if (!valueEquals(props.modelValue, val)) {
        let formatValue;
        if (Array.isArray(val)) {
          formatValue = val.map((_) => formatter(_, props.valueFormat, lang.value));
        } else if (val) {
          formatValue = formatter(val, props.valueFormat, lang.value);
        }
        ctx.emit(UPDATE_MODEL_EVENT, val ? formatValue : val, lang.value);
      }
    };
    const refInput = computed<HTMLInputElement[]>(() => {
      if (inputRef.value) {
        const _r = isRangeInput.value ? inputRef.value : (inputRef.value as any as ComponentPublicInstance).$el;
        return Array.from<HTMLInputElement>(_r.querySelectorAll('input'));
      }
      return [];
    });
    const refStartInput = computed(() => {
      return refInput?.value[0];
    });
    const refEndInput = computed(() => {
      return refInput?.value[1];
    });
    const setSelectionRange = (start: number, end: number, pos: string) => {
      const _inputs = refInput.value;
      if (!_inputs.length) {
        return;
      }
      if (!pos || pos === 'min') {
        _inputs[0].setSelectionRange(start, end);
        _inputs[0].focus();
      } else if (pos === 'max') {
        _inputs[1].setSelectionRange(start, end);
        _inputs[1].focus();
      }
    };
    const onPick = (date: any = '', visible = false) => {
      pickerVisible.value = visible;
      let result;
      if (Array.isArray(date)) {
        result = date.map((_) => _.toDate());
      } else {
        // clear btn emit null
        result = date ? date.toDate() : date;
      }
      userInput.value = null;
      emitInput(result);
    };

    const onBeforeShow = () => {
      pickerActualVisible.value = true;
    };

    const onShow = () => {
      ctx.emit('visible-change', true);
    };

    const onHide = () => {
      pickerActualVisible.value = false;
      ctx.emit('visible-change', false);
    };

    const focus = (focusStartInput = true) => {
      let input = refStartInput.value;
      if (!focusStartInput && isRangeInput.value) {
        input = refEndInput.value;
      }
      if (input) {
        input.focus();
      }
    };

    const handleFocus = (e?: Event) => {
      if (props.readonly || pickerDisabled.value || pickerVisible.value) {
        return;
      }
      pickerVisible.value = true;
      ctx.emit('focus', e);
    };

    const handleBlur = () => {
      refPopper.value?.onClose();
      blurInput();
    };

    const pickerDisabled = computed(() => {
      return props.disabled || form?.disabled;
    });

    const parsedValue = computed(() => {
      let result: any;
      if (valueIsEmpty.value) {
        if (pickerOptions.value.getDefaultValue) {
          result = pickerOptions.value.getDefaultValue();
        }
      } else if (Array.isArray(props.modelValue)) {
        result = props.modelValue.map((_) => parser(_, props.valueFormat, lang.value));
      } else {
        result = parser(props.modelValue, props.valueFormat, lang.value);
      }

      if (pickerOptions.value.getRangeAvailableTime) {
        const availableResult = pickerOptions.value.getRangeAvailableTime(result);
        if (!isEqual(availableResult, result)) {
          result = availableResult;
          emitInput(Array.isArray(result) ? result.map((_) => _.toDate()) : result.toDate());
        }
      }
      if (Array.isArray(result) && result.some((_) => !_)) {
        result = [];
      }
      return result;
    });

    const displayValue = computed(() => {
      if (!pickerOptions.value.panelReady) {
        return;
      }
      const formattedValue = formatDayjsToString(parsedValue.value);
      if (Array.isArray(userInput.value)) {
        return [userInput.value[0] || (formattedValue && formattedValue[0]) || '', userInput.value[1] || (formattedValue && formattedValue[1]) || ''];
      } else if (userInput.value !== null) {
        return userInput.value;
      }
      if (!isTimePicker.value && valueIsEmpty.value) {
        return;
      }
      if (!pickerVisible.value && valueIsEmpty.value) {
        return;
      }
      if (formattedValue) {
        return isDatesPicker.value ? (formattedValue as Array<string>).join(', ') : formattedValue;
      }
      return '';
    });

    const isTimeLikePicker = computed(() => props.type.includes('time'));

    const isTimePicker = computed(() => props.type.startsWith('time'));

    const isDatesPicker = computed(() => props.type === 'dates');

    const triggerIcon = computed(() => props.prefixIcon || (isTimeLikePicker.value ? 'time' : 'calendar'));

    const showClose = ref(false);

    const onClearIconClick = (event: Event) => {
      if (props.readonly || pickerDisabled.value) {
        return;
      }
      if (showClose.value) {
        event.stopPropagation();
        emitInput(null);
        emitChange(null, true);
        showClose.value = false;
        pickerVisible.value = false;
        pickerOptions.value.handleClear && pickerOptions.value.handleClear();
      }
    };
    const valueIsEmpty = computed(() => {
      return !props.modelValue || (Array.isArray(props.modelValue) && !props.modelValue.length);
    });
    const onMouseEnter = () => {
      if (props.readonly || pickerDisabled.value) {
        return;
      }
      if (!valueIsEmpty.value && props.clearable) {
        showClose.value = true;
      }
    };
    const onMouseLeave = () => {
      showClose.value = false;
    };
    const isRangeInput = computed(() => {
      return props.type.includes('range');
    });

    const pickerSize = useSize();

    const popperPaneRef = computed(() => {
      return refPopper.value?.popperRef?.contentRef;
    });

    const popperEl = computed(() => unref(refPopper)?.popperRef?.contentRef);
    const actualInputRef = computed(() => {
      if (unref(isRangeInput)) {
        return unref(inputRef);
      }

      return (unref(inputRef) as ComponentPublicInstance)?.$el;
    });

    onClickOutside(actualInputRef, (e: PointerEvent) => {
      const unrefedPopperEl = unref(popperEl);
      const inputEl = unref(actualInputRef);
      if (
        (unrefedPopperEl && (e.target === unrefedPopperEl || e.composedPath().includes(unrefedPopperEl))) ||
        e.target === inputEl ||
        e.composedPath().includes(inputEl)
      ) {
        return;
      }
      pickerVisible.value = false;
    });

    const handleChange = () => {
      if (userInput.value) {
        const value = parseUserInputToDayjs(displayValue.value);
        if (value) {
          if (isValidValue(value)) {
            emitInput(Array.isArray(value) ? value.map((_) => _.toDate()) : value.toDate());
            userInput.value = null;
          }
        }
      }
      if (userInput.value === '') {
        emitInput(null);
        emitChange(null);
        userInput.value = null;
      }
    };

    const blurInput = () => {
      refInput.value.forEach((input) => input.blur());
    };

    const parseUserInputToDayjs = (value: any) => {
      if (!value) {
        return null;
      }
      return pickerOptions.value.parseUserInput!(value);
    };

    const formatDayjsToString = (value: any) => {
      if (!value) {
        return null;
      }
      return pickerOptions.value.formatToString!(value);
    };

    const isValidValue = (value: any) => {
      return pickerOptions.value.isValidValue!(value);
    };

    const handleKeydown = (event: KeyboardEvent) => {
      const code = event.code;

      if (code === EVENT_CODE.esc) {
        pickerVisible.value = false;
        event.stopPropagation();
        return;
      }

      if (code === EVENT_CODE.tab) {
        if (!isRangeInput.value) {
          handleChange();
          pickerVisible.value = false;
          event.stopPropagation();
        } else {
          // user may change focus between two input
          setTimeout(() => {
            if (!refInput.value.includes(document.activeElement as HTMLInputElement)) {
              pickerVisible.value = false;
              blurInput();
            }
          }, 0);
        }
        return;
      }

      if (code === EVENT_CODE.enter || code === EVENT_CODE.numpadEnter) {
        if (userInput.value === null || userInput.value === '' || isValidValue(parseUserInputToDayjs(displayValue.value))) {
          handleChange();
          pickerVisible.value = false;
        }
        event.stopPropagation();
        return;
      }

      // if user is typing, do not let picker handle key input
      if (userInput.value) {
        event.stopPropagation();
        return;
      }

      if (pickerOptions.value.handleKeydown) {
        pickerOptions.value.handleKeydown(event);
      }
    };
    const onUserInput = (e: string) => {
      userInput.value = e;
    };

    const handleStartInput = (event: any) => {
      if (userInput.value) {
        userInput.value = [event.target.value, userInput.value[1]];
      } else {
        userInput.value = [event.target.value, null];
      }
    };

    const handleEndInput = (event: any) => {
      if (userInput.value) {
        userInput.value = [userInput.value[0], event.target.value];
      } else {
        userInput.value = [null, event.target.value];
      }
    };

    const handleStartChange = () => {
      const value = parseUserInputToDayjs(userInput.value && userInput.value[0]);
      if (value && value.isValid()) {
        userInput.value = [formatDayjsToString(value), displayValue.value[1]];
        const newValue = [value, parsedValue.value && parsedValue.value[1]];
        if (isValidValue(newValue)) {
          emitInput(newValue);
          userInput.value = null;
        }
      }
    };

    const handleEndChange = () => {
      const value = parseUserInputToDayjs(userInput.value && userInput.value[1]);
      if (value && value.isValid()) {
        userInput.value = [displayValue.value[0], formatDayjsToString(value)];
        const newValue = [parsedValue.value && parsedValue.value[0], value];
        if (isValidValue(newValue)) {
          emitInput(newValue);
          userInput.value = null;
        }
      }
    };

    const pickerOptions = ref<Partial<PickerOptions>>({});
    const onSetPickerOption = <T extends keyof PickerOptions>(e: [T, PickerOptions[T]]) => {
      pickerOptions.value[e[0]] = e[1];
      pickerOptions.value.panelReady = true;
    };

    const onCalendarChange = (e: any) => {
      ctx.emit('calendar-change', e);
    };

    const onPanelChange = (value: any, mode: any, view: any) => {
      ctx.emit('panel-change', value, mode, view);
    };

    provide(FZ_PICKER_BASE_INJECT_KEY, { props });

    return {
      // injected popper options
      popperOptions,
      comStyle,

      isDatesPicker,
      handleEndChange,
      handleStartChange,
      handleStartInput,
      handleEndInput,
      onUserInput,
      handleChange,
      handleKeydown,
      popperPaneRef,
      onClickOutside,
      pickerSize,
      isRangeInput,
      onMouseLeave,
      onMouseEnter,
      onClearIconClick,
      showClose,
      triggerIcon,
      onPick,
      handleFocus,
      handleBlur,
      pickerVisible,
      pickerActualVisible,
      displayValue,
      parsedValue,
      setSelectionRange,
      refPopper,
      inputRef,
      pickerDisabled,
      onSetPickerOption,
      onCalendarChange,
      onPanelChange,
      focus,
      onShow,
      onBeforeShow,
      onHide,
    };
  },
});
</script>
