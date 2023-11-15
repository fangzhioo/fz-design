<script lang="ts" setup>
  import { computed, onMounted, onUpdated, reactive, ref, watch } from 'vue'
  import { FzInput, FzSvgIcon } from '../..'
  import { useFormDisabled, useFormItem, useFormSize } from '../../form'
  import { vRepeatClick } from '../../../directives'
  import { CHANGE_EVENT, INPUT_EVENT, UPDATE_MODEL_EVENT } from '../../../constants'
  import { useLocale, useNamespace } from '../../../hooks'
  import {
    warning,
    isNumber,
    isString,
    isUndefined,
    throwError,
    isNil
  } from '../../../utils'
  import {
    IconChevronDown,
    IconChevronUp,
    IconMinus,
    IconPlus
  } from '@fz-design/fz-design-icon'

  import { Emits, Props } from './props'

  import type { InputInstance } from '../..'

  defineOptions({
    name: 'FzInputNumber'
  })

  const props = defineProps(Props)
  const emit = defineEmits(Emits)

  const { t } = useLocale()
  const ns = useNamespace('input-number')
  const input = ref<InputInstance>()

  interface Data {
    currentValue: number | null | undefined
    userInput: null | number | string
  }
  const data = reactive<Data>({
    currentValue: props.modelValue,
    userInput: null
  })

  const { formItem } = useFormItem()

  const minDisabled = computed(
    () => isNumber(props.modelValue) && props.modelValue <= props.min
  )
  const maxDisabled = computed(
    () => isNumber(props.modelValue) && props.modelValue >= props.max
  )

  const numPrecision = computed(() => {
    const stepPrecision = getPrecision(props.step)
    if (!isUndefined(props.precision)) {
      if (stepPrecision > props.precision) {
        warning(
          'InputNumber',
          'precision should not be less than the decimal places of step'
        )
      }
      return props.precision
    } else {
      return Math.max(getPrecision(props.modelValue), stepPrecision)
    }
  })
  const controlsAtRight = computed(() => {
    return props.controls && props.controlsPosition === 'right'
  })

  const inputNumberSize = useFormSize()
  const inputNumberDisabled = useFormDisabled()

  const displayValue = computed(() => {
    if (data.userInput !== null) {
      return data.userInput
    }
    let currentValue: number | string | undefined | null = data.currentValue
    if (isNil(currentValue)) return ''
    if (isNumber(currentValue)) {
      if (Number.isNaN(currentValue)) return ''
      if (!isUndefined(props.precision)) {
        currentValue = currentValue.toFixed(props.precision)
      }
    }
    return currentValue
  })
  const toPrecision = (num: number, pre?: number): number => {
    if (isUndefined(pre)) pre = numPrecision.value
    if (pre === 0) return Math.round(num)
    let numStr = String(num)
    const pointPos = numStr.indexOf('.')
    if (pointPos === -1) return num
    const numStrArr = numStr.replace('.', '').split('')
    const datum = numStrArr[pointPos + pre]
    if (!datum) return num
    const length = numStr.length
    if (numStr.charAt(length - 1) === '5') {
      numStr = `${numStr.slice(0, Math.max(0, length - 1))}6`
    }
    return Number.parseFloat(Number(numStr).toFixed(pre))
  }
  const getPrecision = (value: number | null | undefined): number => {
    if (isNil(value)) return 0
    const valueString = value.toString()
    const dotPosition = valueString.indexOf('.')
    let precision = 0
    if (dotPosition !== -1) {
      precision = valueString.length - dotPosition - 1
    }
    return precision
  }
  const ensurePrecision = (
    val: number,
    coefficient: 1 | -1 = 1
  ): number | null | undefined => {
    if (!isNumber(val)) return data.currentValue
    // Solve the accuracy problem of JS decimal calculation by converting the value to integer.
    return toPrecision(val + props.step * coefficient)
  }
  const increase = (): void => {
    if (props.readonly || inputNumberDisabled.value || maxDisabled.value) return
    const value = Number(displayValue.value) || 0
    const newVal = ensurePrecision(value)
    setCurrentValue(newVal)
    emit(INPUT_EVENT, data.currentValue)
  }
  const decrease = (): void => {
    if (props.readonly || inputNumberDisabled.value || minDisabled.value) return
    const value = Number(displayValue.value) || 0
    const newVal = ensurePrecision(value, -1)
    setCurrentValue(newVal)
    emit(INPUT_EVENT, data.currentValue)
  }
  const verifyValue = (
    value: number | string | null | undefined,
    update?: boolean
  ): number | null | undefined => {
    const { max, min, step, precision, stepStrictly, valueOnClear } = props
    if (max < min) {
      throwError('InputNumber', 'min should not be greater than max.')
    }
    let newVal = Number(value)
    if (isNil(value) || Number.isNaN(newVal)) {
      return null
    }
    if (value === '') {
      if (valueOnClear === null) {
        return null
      }
      newVal = isString(valueOnClear) ? { min, max }[valueOnClear] : valueOnClear
    }
    if (stepStrictly) {
      newVal = toPrecision(Math.round(newVal / step) * step, precision)
    }
    if (!isUndefined(precision)) {
      newVal = toPrecision(newVal, precision)
    }
    if (newVal > max || newVal < min) {
      newVal = newVal > max ? max : min
      update && emit(UPDATE_MODEL_EVENT, newVal)
    }
    return newVal
  }
  const setCurrentValue = (
    value: number | string | null | undefined,
    emitChange = true
  ): void => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const oldVal = data.currentValue!
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const newVal = verifyValue(value)!
    if (!emitChange) {
      emit(UPDATE_MODEL_EVENT, newVal)
      return
    }
    if (oldVal === newVal) return
    data.userInput = null
    emit(UPDATE_MODEL_EVENT, newVal)
    emit(CHANGE_EVENT, newVal, oldVal)
    if (props.validateEvent) {
      formItem?.validate?.('change').catch((err: any) => warning(ns.b(), err))
    }
    data.currentValue = newVal
  }
  const handleInput = (value: string): void => {
    data.userInput = value
    const newVal = value === '' ? null : Number(value)
    emit(INPUT_EVENT, newVal)
    setCurrentValue(newVal, false)
  }
  const handleInputChange = (value: string): void => {
    const newVal = value !== '' ? Number(value) : ''
    if ((isNumber(newVal) && !Number.isNaN(newVal)) || value === '') {
      setCurrentValue(newVal)
    }
    data.userInput = null
  }

  const focus = (): void => {
    input.value?.focus?.()
  }

  const blur = (): void => {
    input.value?.blur?.()
  }

  const handleFocus = (event: MouseEvent | FocusEvent): void => {
    emit('focus', event)
  }

  const handleBlur = (event: MouseEvent | FocusEvent): void => {
    emit('blur', event)
    if (props.validateEvent) {
      formItem?.validate?.('blur').catch((err: any) => warning(ns.b(), err))
    }
  }

  watch(
    () => props.modelValue,
    value => {
      const userInput = verifyValue(data.userInput)
      const newValue = verifyValue(value, true)
      if (!isNumber(userInput) && (!userInput || userInput !== newValue)) {
        data.currentValue = newValue
        data.userInput = null
      }
    },
    { immediate: true }
  )
  onMounted(() => {
    const { min, max, modelValue } = props
    const innerInput = input.value?.input as HTMLInputElement
    innerInput.setAttribute('role', 'spinbutton')
    if (Number.isFinite(max)) {
      innerInput.setAttribute('aria-valuemax', String(max))
    } else {
      innerInput.removeAttribute('aria-valuemax')
    }
    if (Number.isFinite(min)) {
      innerInput.setAttribute('aria-valuemin', String(min))
    } else {
      innerInput.removeAttribute('aria-valuemin')
    }
    innerInput.setAttribute(
      'aria-valuenow',
      data.currentValue || data.currentValue === 0 ? String(data.currentValue) : ''
    )
    innerInput.setAttribute('aria-disabled', String(inputNumberDisabled.value))
    if (!isNumber(modelValue) && modelValue != null) {
      let val: number | null = Number(modelValue)
      if (Number.isNaN(val)) {
        val = null
      }
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      emit(UPDATE_MODEL_EVENT, val!)
    }
  })
  onUpdated(() => {
    const innerInput = input.value?.input
    innerInput?.setAttribute('aria-valuenow', `${data.currentValue ?? ''}`)
  })
  defineExpose({
    /** @description get focus the input component */
    focus,
    /** @description remove focus the input component */
    blur
  })
</script>
<template>
  <div
    :class="[
      ns.b(),
      ns.m(inputNumberSize),
      ns.is('disabled', inputNumberDisabled),
      ns.is('without-controls', !controls),
      ns.is('controls-right', controlsAtRight)
    ]"
    @dragstart.prevent
  >
    <span
      v-if="controls"
      v-repeat-click="decrease"
      role="button"
      :aria-label="t('fz.inputNumber.decrease')"
      :class="[ns.e('decrease'), ns.is('disabled', minDisabled)]"
      @keydown.enter="decrease"
    >
      <fz-svg-icon :icon="controlsAtRight ? IconChevronDown : IconMinus" />
    </span>
    <span
      v-if="controls"
      v-repeat-click="increase"
      role="button"
      :aria-label="t('fz.inputNumber.increase')"
      :class="[ns.e('increase'), ns.is('disabled', maxDisabled)]"
      @keydown.enter="increase"
    >
      <fz-svg-icon :icon="controlsAtRight ? IconChevronUp : IconPlus" />
    </span>
    <fz-input
      :id="id"
      ref="input"
      type="number"
      :step="step"
      :model-value="displayValue"
      :placeholder="placeholder"
      :readonly="readonly"
      :disabled="inputNumberDisabled"
      :size="inputNumberSize"
      :max="max"
      :min="min"
      :name="name"
      :label="label"
      :validate-event="false"
      @wheel.prevent
      @keydown.up.prevent="increase"
      @keydown.down.prevent="decrease"
      @blur="handleBlur"
      @focus="handleFocus"
      @input="handleInput"
      @change="handleInputChange"
    />
  </div>
</template>
