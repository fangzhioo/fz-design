<script lang="ts" setup>
  import { computed, inject, markRaw, ref, watch } from 'vue'
  import {
    CHANGE_EVENT,
    EVENT_CODE,
    FZ_FORM_ITEM_INJECT_KEY,
    FZ_FORM_INJECT_KEY,
    UPDATE_MODEL_EVENT
  } from '../../../constants'
  import { hasClass, isArray, isObject, isString } from '../../../utils'
  import SvgIcon from '../../svg-icon/src/svg-icon.vue'

  import { useFormItemInputId, useFormSize } from '../../form/src/hooks'
  import { Props, Emits } from './props'

  import type { CSSProperties, Component } from 'vue'
  import type { IconSlotType } from '../../../types'

  function getValueFromMap<T> (
    value: number,
    map: Record<string, T | { excluded?: boolean; value: T }>
  ): any {
    const isExcludedObject = (
      val: unknown
    ): val is { excluded?: boolean } & Record<any, unknown> => isObject(val)

    const matchedKeys = Object.keys(map)
      .map(key => +key)
      .filter(key => {
        const val = map[key]
        const excluded = isExcludedObject(val) ? val.excluded : false
        return excluded ? value < key : value <= key
      })
      .sort((a, b) => a - b)
    const matchedValue = map[matchedKeys[0]]
    return (isExcludedObject(matchedValue) && matchedValue.value) || matchedValue
  }

  defineOptions({
    name: 'FzRate'
  })

  const props = defineProps(Props)
  const emit = defineEmits(Emits)

  const formContext = inject<any>(FZ_FORM_INJECT_KEY, undefined)
  const formItemContext = inject<any>(FZ_FORM_ITEM_INJECT_KEY, undefined)
  const rateSize = useFormSize()

  const { inputId, isLabeledByFormItem } = useFormItemInputId(props, {
    formItemContext
  })

  const currentValue = ref(props.modelValue)
  const hoverIndex = ref(-1)
  const pointerAtLeftHalf = ref(true)

  const rateDisabled = computed(() => props.disabled || formContext?.disabled)
  const rateClasses = computed(() => [
    'fz-rate',
    {
      [`fz-rate--${rateSize.value}`]: !!rateSize.value,
      'is-disabled': rateDisabled.value
    }
  ])
  const rateStyles = computed(() => {
    return {
      '--fz-rate-void-color': props.voidColor,
      '--fz-rate-disabled-void-color': props.disabledVoidColor,
      '--fz-rate-fill-color': activeColor.value
    } as CSSProperties
  })

  const text = computed(() => {
    let result = ''
    if (props.showScore) {
      result = props.scoreTemplate.replace(
        /\{\s*value\s*\}/,
        rateDisabled.value ? `${props.modelValue}` : `${currentValue.value}`
      )
    } else if (props.showText) {
      result = props.texts[Math.ceil(currentValue.value) - 1]
    }
    return result
  })
  const valueDecimal = computed(
    () => props.modelValue * 100 - Math.floor(props.modelValue) * 100
  )
  const colorMap = computed(() =>
    isArray(props.colors)
      ? {
          [props.lowThreshold]: props.colors[0],
          [props.highThreshold]: { value: props.colors[1], excluded: true },
          [props.max]: props.colors[2]
        }
      : props.colors
  )
  const activeColor = computed(() => {
    const color = getValueFromMap(currentValue.value, colorMap.value)
    // {value: '', excluded: true} returned
    return isObject(color) ? '' : color
  })
  const decimalStyle = computed(() => {
    let width = ''
    if (rateDisabled.value) {
      width = `${valueDecimal.value}%`
    } else if (props.allowHalf) {
      width = '50%'
    }
    return {
      color: activeColor.value,
      width
    }
  })
  const componentMap = computed(() => {
    let icons = isArray(props.icons) ? [...props.icons] : { ...props.icons }
    icons = markRaw(icons) as (string | Component)[] | Record<number, string | Component>
    return isArray(icons)
      ? {
          [props.lowThreshold]: icons[0],
          [props.highThreshold]: {
            value: icons[1],
            excluded: true
          },
          [props.max]: icons[2]
        }
      : icons
  })
  const decimalIconComponent = computed(() =>
    getValueFromMap(props.modelValue, componentMap.value)
  )
  const voidComponent = computed(() =>
    rateDisabled.value
      ? isString(props.disabledVoidIcon)
        ? props.disabledVoidIcon
        : (markRaw(props.disabledVoidIcon) as IconSlotType)
      : isString(props.voidIcon)
      ? props.voidIcon
      : (markRaw(props.voidIcon) as IconSlotType)
  )
  const activeComponent = computed(() =>
    getValueFromMap(currentValue.value, componentMap.value)
  )

  function showDecimalIcon (item: number): boolean {
    const showWhenDisabled =
      rateDisabled.value &&
      valueDecimal.value > 0 &&
      item - 1 < props.modelValue &&
      item > props.modelValue
    const showWhenAllowHalf =
      props.allowHalf &&
      pointerAtLeftHalf.value &&
      item - 0.5 <= currentValue.value &&
      item > currentValue.value
    return showWhenDisabled || showWhenAllowHalf
  }

  function emitValue (value: number): void {
    // if allow clear, and selected value is same as modelValue, reset value to 0
    if (props.clearable && value === props.modelValue) {
      value = 0
    }

    emit(UPDATE_MODEL_EVENT, value)
    if (props.modelValue !== value) {
      emit(CHANGE_EVENT, value)
    }
  }

  function selectValue (value: number): void {
    if (rateDisabled.value) {
      return
    }
    if (props.allowHalf && pointerAtLeftHalf.value) {
      emitValue(currentValue.value)
    } else {
      emitValue(value)
    }
  }

  function handleKey (e: KeyboardEvent): number | undefined {
    if (rateDisabled.value) {
      return
    }
    let _currentValue = currentValue.value
    const code = e.code
    if (code === EVENT_CODE.up || code === EVENT_CODE.right) {
      if (props.allowHalf) {
        _currentValue += 0.5
      } else {
        _currentValue += 1
      }
      e.stopPropagation()
      e.preventDefault()
    } else if (code === EVENT_CODE.left || code === EVENT_CODE.down) {
      if (props.allowHalf) {
        _currentValue -= 0.5
      } else {
        _currentValue -= 1
      }
      e.stopPropagation()
      e.preventDefault()
    }
    _currentValue = _currentValue < 0 ? 0 : _currentValue
    _currentValue = _currentValue > props.max ? props.max : _currentValue
    emit(UPDATE_MODEL_EVENT, _currentValue)
    emit(CHANGE_EVENT, _currentValue)
    return _currentValue
  }

  function setCurrentValue (value: number, event?: MouseEvent): void {
    if (rateDisabled.value) {
      return
    }
    if (props.allowHalf && event) {
      // TODO: use cache via computed https://github.com/element-plus/element-plus/pull/5456#discussion_r786472092
      let target = event.target as HTMLElement
      if (hasClass(target, 'fz-rate__item')) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        target = target.querySelector('.fz-rate__icon')!
      }
      if (target.clientWidth === 0 || hasClass(target, 'fz-rate__decimal')) {
        target = target.parentNode as HTMLElement
      }
      pointerAtLeftHalf.value = event.offsetX * 2 <= target.clientWidth
      currentValue.value = pointerAtLeftHalf.value ? value - 0.5 : value
    } else {
      currentValue.value = value
    }
    hoverIndex.value = value
  }

  function resetCurrentValue (): void {
    if (rateDisabled.value) {
      return
    }
    if (props.allowHalf) {
      pointerAtLeftHalf.value = props.modelValue !== Math.floor(props.modelValue)
    }
    currentValue.value = props.modelValue
    hoverIndex.value = -1
  }

  watch(
    () => props.modelValue,
    val => {
      currentValue.value = val
      pointerAtLeftHalf.value = props.modelValue !== Math.floor(props.modelValue)
    }
  )

  if (!props.modelValue) {
    emit(UPDATE_MODEL_EVENT, 0)
  }

  defineExpose({
    /** @description set current value */
    setCurrentValue,
    /** @description reset current value */
    resetCurrentValue
  })
</script>
<template>
  <div
    :id="inputId"
    :class="rateClasses"
    role="slider"
    :aria-label="!isLabeledByFormItem ? label || 'rating' : undefined"
    :aria-labelledby="isLabeledByFormItem ? formItemContext?.labelId : undefined"
    :aria-valuenow="currentValue"
    :aria-valuetext="text || undefined"
    aria-valuemin="0"
    :aria-valuemax="max"
    tabindex="0"
    :style="rateStyles"
    @keydown="handleKey"
  >
    <span
      v-for="(item, key) in max"
      :key="key"
      class="fz-rate__item"
      @mousemove="setCurrentValue(item, $event)"
      @mouseleave="resetCurrentValue"
      @click="selectValue(item)"
    >
      <svg-icon
        :class="[
          'fz-rate__icon',
          {
            'is-hover': hoverIndex === item,
            'is-active': item <= currentValue
          }
        ]"
      >
        <template v-if="!showDecimalIcon(item)">
          <component :is="activeComponent" v-show="item <= currentValue" />
          <component :is="voidComponent" v-show="!(item <= currentValue)" />
        </template>
        <svg-icon
          v-if="showDecimalIcon(item)"
          :style="decimalStyle"
          class="fz-rate__decimal fz-rate__icon"
        >
          <component :is="decimalIconComponent" />
        </svg-icon>
      </svg-icon>
    </span>
    <span
      v-if="showText || showScore"
      class="fz-rate__text"
      :style="{ color: textColor }"
    >
      {{ text }}
    </span>
  </div>
</template>
