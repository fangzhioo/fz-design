<template>
  <div
    :class="[
      'fz-input-number',
      `fz-input-number--${inputNumberSize}`,
      {
        'is-disabled': inputNumberDisabled,
        'is-without-controls': !controls,
        'is-controls-right': controlsAtRight,
      },
    ]"
    @dragstart.prevent
  >
    <span
      v-if="controls"
      v-repeat-click="decrease"
      role="button"
      :aria-label="t('fz.inputNumber.decrease')"
      :class="['fz-input-number__decrease', { 'is-disabled': minDisabled }]"
      @keydown.enter="decrease"
    >
      <fz-icon :name="controlsAtRight ? 'arrow-down-bold' : 'minus-bold'"> </fz-icon>
    </span>
    <span
      v-if="controls"
      v-repeat-click="increase"
      role="button"
      :aria-label="t('fz.inputNumber.increase')"
      :class="['fz-input-number__increase', { 'is-disabled': maxDisabled }]"
      @keydown.enter="increase"
    >
      <fz-icon :name="controlsAtRight ? 'arrow-up-bold' : 'add-bold'"> </fz-icon>
    </span>
    <fz-input
      :id="id"
      ref="input"
      type="number"
      :step="step"
      :model-value="displayValue"
      :placeholder="placeholder"
      :disabled="inputNumberDisabled"
      :size="inputNumberSize"
      :max="max"
      :min="min"
      :name="name"
      :label="label"
      :validate-event="false"
      @keydown.up.prevent="increase"
      @keydown.down.prevent="decrease"
      @blur="handleBlur"
      @focus="handleFocus"
      @input="handleInput"
      @change="handleInputChange"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, onUpdated, reactive, ref, watch } from 'vue';
import { Input, Icon } from '@fzui/components';
import { RepeatClick } from '@fzui/directives';
import { useDisabled, useForm, useLocale, useSize } from '@fzui/hooks';
import { debugWarn, isNil, isNumber, isString, isUndefined } from '@fzui/utils';
import { BLUR_EVENT, CHANGE_EVENT, FOCUS_EVENT, INPUT_EVENT, UPDATE_MODEL_EVENT } from '@fzui/constants';
import { IData, inputNumberEmits, inputNumberProps } from './InputNumber';
import type { ComponentPublicInstance } from 'vue';

export default defineComponent({
  name: 'FzInputNumber',
  components: {
    FzInput: Input,
    FzIcon: Icon,
  },
  directives: {
    RepeatClick,
  },
  props: inputNumberProps,
  emits: inputNumberEmits,
  setup(props, { emit }) {
    const input = ref<ComponentPublicInstance<typeof Input>>();
    const data = reactive<IData>({
      currentValue: props.modelValue,
      userInput: null,
    });
    const { t } = useLocale();
    const { formItem } = useForm();
    const inputNumberSize = useSize();
    const inputNumberDisabled = useDisabled();

    const ensurePrecision = (val: number | null, coefficient: 1 | -1 = 1): number => {
      if (!isNumber(val)) return data.currentValue || 0;
      // Solve the accuracy problem of JS decimal calculation by converting the value to integer.
      return toPrecision(val + props.step * coefficient);
    };

    const minDisabled = computed(() => isNumber(props.modelValue) && ensurePrecision(props.modelValue, -1) < props.min);
    const maxDisabled = computed(() => isNumber(props.modelValue) && ensurePrecision(props.modelValue) > props.max);

    const numPrecision = computed(() => {
      const stepPrecision = getPrecision(props.step);
      if (!isUndefined(props.precision)) {
        if (stepPrecision > props.precision) {
          debugWarn('InputNumber', 'precision should not be less than the decimal places of step');
        }
        return props.precision;
      } else {
        return Math.max(getPrecision(props.modelValue), stepPrecision);
      }
    });
    const controlsAtRight = computed(() => {
      return props.controls && props.controlsPosition === 'right';
    });

    const displayValue = computed(() => {
      if (data.userInput !== null) {
        return data.userInput;
      }
      let currentValue: number | string | undefined | null = data.currentValue;
      if (isNil(currentValue)) return '';
      if (isNumber(currentValue)) {
        if (Number.isNaN(currentValue)) return '';
        if (!isUndefined(props.precision)) {
          currentValue = currentValue.toFixed(props.precision);
        }
      }
      return currentValue;
    });
    const toPrecision = (num: number, pre?: number) => {
      if (isUndefined(pre)) pre = numPrecision.value;
      const digits = num.toString().split('.');
      if (digits.length > 1) {
        const integer = digits[0];
        const decimal = Math.round(+digits[1] / 10 ** (digits[1].length - pre));
        return Number.parseFloat(`${integer}.${decimal}`);
      }
      return Number.parseFloat(`${Math.round(num * 10 ** pre) / 10 ** pre}`);
    };
    const getPrecision = (value: number | null | undefined) => {
      if (isNil(value)) return 0;
      const valueString = value.toString();
      const dotPosition = valueString.indexOf('.');
      let precision = 0;
      if (dotPosition !== -1) {
        precision = valueString.length - dotPosition - 1;
      }
      return precision;
    };

    const increase = () => {
      if (inputNumberDisabled.value || maxDisabled.value) return;
      const value = props.modelValue || 0;
      const newVal = ensurePrecision(value);
      setCurrentValue(newVal);
    };
    const decrease = () => {
      if (inputNumberDisabled.value || minDisabled.value) return;
      const value = props.modelValue || 0;
      const newVal = ensurePrecision(value, -1);
      setCurrentValue(newVal);
    };
    const verifyValue = (value: number | string | null | undefined, update?: boolean): number | null | undefined => {
      const { max, min, step, precision, stepStrictly, valueOnClear } = props;
      let newVal = Number(value);
      if (isNil(value) || Number.isNaN(newVal)) {
        return null;
      }
      if (value === '') {
        if (valueOnClear === null) {
          return null;
        }
        newVal = isString(valueOnClear) ? ({ min, max }[valueOnClear] as number) : valueOnClear;
      }
      if (stepStrictly) {
        newVal = Math.round(newVal / step) * step;
      }
      if (!isUndefined(precision)) {
        newVal = toPrecision(newVal, precision);
      }
      if (newVal > max || newVal < min) {
        newVal = newVal > max ? max : min;
        update && emit(UPDATE_MODEL_EVENT, newVal);
      }
      return newVal;
    };
    const setCurrentValue = (value: number | string | null | undefined) => {
      const oldVal = data.currentValue;
      const newVal = verifyValue(value);
      if (oldVal === newVal) return;
      data.userInput = null;
      emit(UPDATE_MODEL_EVENT, newVal);
      emit(INPUT_EVENT, newVal);
      emit(CHANGE_EVENT, newVal, oldVal);
      formItem?.validate?.('change').catch((err) => debugWarn(err));
      data.currentValue = newVal;
    };
    const handleInput = (value: string) => {
      return (data.userInput = value);
    };
    const handleInputChange = (value: string) => {
      const newVal = value !== '' ? Number(value) : '';
      if ((isNumber(newVal) && !Number.isNaN(newVal)) || value === '') {
        setCurrentValue(newVal);
      }
      data.userInput = null;
    };

    const focus = () => {
      input.value?.focus?.();
    };

    const blur = () => {
      input.value?.blur?.();
    };

    const handleFocus = (event: MouseEvent | FocusEvent) => {
      emit(FOCUS_EVENT, event);
    };

    const handleBlur = (event: MouseEvent | FocusEvent) => {
      emit(BLUR_EVENT, event);
      formItem?.validate?.('blur').catch((err) => debugWarn(err));
    };

    watch(
      () => props.modelValue,
      (value) => {
        data.currentValue = verifyValue(value, true);
        data.userInput = null;
      },
      { immediate: true },
    );
    onMounted(() => {
      const { min, max, modelValue } = props;
      const innerInput = input.value?.input as HTMLInputElement;
      innerInput.setAttribute('role', 'spinbutton');
      if (Number.isFinite(max)) {
        innerInput.setAttribute('aria-valuemax', String(max));
      } else {
        innerInput.removeAttribute('aria-valuemax');
      }
      if (Number.isFinite(min)) {
        innerInput.setAttribute('aria-valuemin', String(min));
      } else {
        innerInput.removeAttribute('aria-valuemin');
      }
      innerInput.setAttribute('aria-valuenow', String(data.currentValue));
      innerInput.setAttribute('aria-disabled', String(inputNumberDisabled.value));
      if (!isNumber(modelValue) && modelValue !== null) {
        let val: number | null = Number(modelValue);
        if (Number.isNaN(val)) {
          val = null;
        }
        emit('update:modelValue', val);
      }
    });
    onUpdated(() => {
      const innerInput = input.value?.input;
      innerInput?.setAttribute('aria-valuenow', data.currentValue);
    });
    return {
      t,
      input,
      displayValue,
      handleInput,
      handleInputChange,
      controlsAtRight,
      decrease,
      increase,
      inputNumberSize,
      inputNumberDisabled,
      maxDisabled,
      minDisabled,
      focus,
      blur,
      handleFocus,
      handleBlur,
    };
  },
});
</script>
