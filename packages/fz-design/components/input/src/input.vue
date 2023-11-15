<script lang="ts" setup>
  import {
    ref,
    computed,
    useSlots,
    useAttrs as useRawAttrs,
    shallowRef,
    nextTick,
    watch,
    onMounted
  } from 'vue'
  import { Props, Emits } from './props'
  import { FzSvgIcon } from '../..'
  import { CHANGE_EVENT, INPUT_EVENT, UPDATE_MODEL_EVENT } from '../../../constants'
  import { isNil, warning } from '../../../utils'
  import {
    useFormDisabled,
    useFormItem,
    useFormItemInputId,
    useFormSize
  } from '../../form/src/hooks'
  import { useAttrs, useCursor, useFocusController, useNamespace } from '../../../hooks'
  import { IconEyeOff, IconEye, IconXCircle } from '@fz-design/fz-design-icon'

  import type { StyleValue } from 'vue'

  // TODO 缺少form校验
  const ValidateIconsMap: Record<any, any> = {}

  defineOptions({
    name: 'FzInput',
    inheritAttrs: false
  })

  const ns = useNamespace('input')
  const props = defineProps(Props)
  const emit = defineEmits(Emits)
  const slots = useSlots()
  const rawAttrs = useRawAttrs()
  const input = shallowRef<HTMLInputElement>()

  const hovering = ref(false)
  const isComposing = ref(false)
  const passwordVisible = ref(false)

  const containerAttrs = computed(() => {
    const comboBoxAttrs: Record<string, unknown> = {}
    if (props.containerRole === 'combobox') {
      comboBoxAttrs['aria-haspopup'] = rawAttrs['aria-haspopup']
      comboBoxAttrs['aria-owns'] = rawAttrs['aria-owns']
      comboBoxAttrs['aria-expanded'] = rawAttrs['aria-expanded']
    }
    return comboBoxAttrs
  })

  const containerKls = computed(() => [
    ns.b(),
    ns.m(inputSize.value),
    ns.is('disabled', inputDisabled.value),
    ns.is('exceed', inputExceed.value),
    {
      [ns.b('group')]: slots.prepend || slots.append,
      [ns.bm('group', 'append')]: slots.append,
      [ns.bm('group', 'prepend')]: slots.prepend,
      [ns.m('prefix')]: slots.prefix || props.prefixIcon,
      [ns.m('suffix')]:
        slots.suffix || props.suffixIcon || props.clearable || props.showPassword,
      [ns.bm('suffix', 'password-clear')]: showClear.value && showPwdVisible.value
    },
    rawAttrs.class
  ])

  const wrapperKls = computed(() => [ns.e('wrapper'), ns.is('focus', isFocused.value)])

  const attrs = useAttrs({
    excludeKeys: computed<string[]>(() => {
      return Object.keys(containerAttrs.value)
    })
  })
  const { form, formItem } = useFormItem()
  const { inputId } = useFormItemInputId(props, {
    formItemContext: formItem
  })
  const inputSize = useFormSize()
  const inputDisabled = useFormDisabled()
  const inputType = computed(() => props.showPassword ? (passwordVisible.value ? 'text' : 'password') : props.type);

  const { wrapperRef, isFocused, handleFocus, handleBlur } = useFocusController(input, {
    afterBlur () {
      if (props.validateEvent) {
        formItem?.validate?.('blur').catch((err: any) => warning(ns.b(), err))
      }
    }
  })

  const needStatusIcon = computed(() => form?.statusIcon ?? false)
  const validateState = computed(() => formItem?.validateState || '')
  const validateIcon = computed(
    () => validateState.value && ValidateIconsMap[validateState.value]
  )
  const passwordIcon = computed(() => (passwordVisible.value ? IconEye : IconEyeOff))
  const containerStyle = computed<StyleValue>(() => [
    rawAttrs.style as StyleValue,
    props.inputStyle
  ])

  const nativeInputValue = computed(() =>
    isNil(props.modelValue) ? '' : String(props.modelValue)
  )
  const showClear = computed(
    () =>
      props.clearable &&
      !inputDisabled.value &&
      !props.readonly &&
      !!nativeInputValue.value &&
      (isFocused.value || hovering.value)
  )
  const showPwdVisible = computed(
    () =>
      props.showPassword &&
      !inputDisabled.value &&
      !props.readonly &&
      !!nativeInputValue.value &&
      (!!nativeInputValue.value || isFocused.value)
  )
  const isWordLimitVisible = computed(
    () =>
      props.showWordLimit &&
      !!attrs.value.maxlength &&
      props.type === 'text' &&
      !inputDisabled.value &&
      !props.readonly &&
      !props.showPassword
  )
  const textLength = computed(() => nativeInputValue.value.length)
  const inputExceed = computed(
    () =>
      // show exceed style if length of initial value greater then maxlength
      !!isWordLimitVisible.value && textLength.value > Number(attrs.value.maxlength)
  )
  const suffixVisible = computed(
    () =>
      !!slots.suffix ||
      !!props.suffixIcon ||
      showClear.value ||
      props.showPassword ||
      isWordLimitVisible.value ||
      (!!validateState.value && needStatusIcon.value)
  )

  const [recordCursor, setCursor] = useCursor(input)

  const setNativeInputValue = (): void => {
    const inputTarget = input.value;
    const formatterValue = props.formatter
      ? props.formatter(nativeInputValue.value)
      : nativeInputValue.value
    if (!inputTarget || inputTarget.value === formatterValue) return
    inputTarget.value = formatterValue
  }

  const handleInput = async (event: Event): Promise<void> => {
    recordCursor()

    let { value } = event.target as HTMLInputElement

    if (props.formatter) {
      value = props.parser ? props.parser(value) : value
    }

    // should not emit input during composition
    if (isComposing.value) return

    // should remove the following line when we don't support IE
    if (value === nativeInputValue.value) {
      setNativeInputValue()
      return
    }

    emit(UPDATE_MODEL_EVENT, value)
    emit(INPUT_EVENT, value)

    // ensure native input value is controlled
    await nextTick()
    setNativeInputValue()
    setCursor()
  }

  const handleChange = (event: Event): void => {
    emit(CHANGE_EVENT, (event.target as HTMLInputElement).value)
  }

  const handleCompositionStart = (event: CompositionEvent): void => {
    emit('compositionstart', event)
    isComposing.value = true
  }

  const handleCompositionUpdate = (event: CompositionEvent): void => {
    emit('compositionupdate', event)
    // const text = (event.target as HTMLInputElement)?.value
    // const lastCharacter = text[text.length - 1] || ''
    // isComposing.value = !isKorean(lastCharacter)
    isComposing.value = true;
  }

  const handleCompositionEnd = (event: CompositionEvent): void => {
    emit('compositionend', event)
    if (isComposing.value) {
      isComposing.value = false
      handleInput(event)
    }
  }

  const handlePasswordVisible = (): void => {
    passwordVisible.value = !passwordVisible.value
    focus()
  }

  const focus = async (): Promise<void> => {
    await nextTick()
    input.value?.focus()
  }

  const blur = (): void => input.value?.blur()

  const handleMouseLeave = (evt: MouseEvent): void => {
    hovering.value = false
    emit('mouseleave', evt)
  }

  const handleMouseEnter = (evt: MouseEvent): void => {
    hovering.value = true
    emit('mouseenter', evt)
  }

  const handleKeydown = (evt: KeyboardEvent): void => {
    emit('keydown', evt)
  }

  const select = (): void => {
    input.value?.select()
  }

  const clear = (e: MouseEvent): void => {
    e.preventDefault();
    emit(UPDATE_MODEL_EVENT, '')
    emit(CHANGE_EVENT, '')
    emit(INPUT_EVENT, '')
    emit('clear')
  }

  watch(
    () => props.modelValue,
    () => {
      if (props.validateEvent) {
        formItem?.validate?.('change').catch((err: any) => warning(ns.b(), err))
      }
    }
  )

  // native input value is set explicitly
  // do not use v-model / :value in template
  watch(nativeInputValue, () => setNativeInputValue())

  // update DOM dependent value and styles
  watch(
    () => props.type,
    async () => {
      await nextTick()
      setNativeInputValue()
    }
  )

  onMounted(() => {
    if (!props.formatter && props.parser) {
      warning('FzInput', 'If you set the parser, you also need to set the formatter.')
    }
    setNativeInputValue()
  })

  defineExpose({
    /** @description HTML input element */
    input,

    /** @description HTML input element native method */
    focus,
    /** @description HTML input element native method */
    blur,
    /** @description HTML input element native method */
    select,
    /** @description clear input value */
    clear
  })
</script>

<template>
  <div
    v-show="type !== 'hidden'"
    v-bind="containerAttrs"
    :class="containerKls"
    :style="containerStyle"
    :role="containerRole"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <!-- prepend slot -->
    <div v-if="$slots.prepend" :class="ns.be('group', 'prepend')">
      <slot name="prepend" />
    </div>

    <div ref="wrapperRef" :class="wrapperKls">
      <!-- prefix slot -->
      <span v-if="$slots.prefix || prefixIcon" :class="ns.e('prefix')">
        <span :class="ns.e('prefix-inner')">
          <slot name="prefix" />
          <fz-svg-icon v-if="prefixIcon" :icon="prefixIcon" :class="ns.e('icon')" />
        </span>
      </span>

      <input
        :id="inputId"
        ref="input"
        :class="ns.e('inner')"
        v-bind="attrs"
        :type="inputType"
        :disabled="inputDisabled"
        :formatter="formatter"
        :parser="parser"
        :readonly="readonly"
        :autocomplete="autocomplete"
        :tabindex="tabindex"
        :aria-label="label"
        :placeholder="placeholder"
        :style="inputStyle"
        :form="props.form"
        :autofocus="autofocus"
        @compositionstart="handleCompositionStart"
        @compositionupdate="handleCompositionUpdate"
        @compositionend="handleCompositionEnd"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @change="handleChange"
        @keydown="handleKeydown"
      />

      <!-- suffix slot -->
      <span v-if="suffixVisible" :class="ns.e('suffix')">
        <span :class="ns.e('suffix-inner')">
          <template v-if="!showClear || !showPwdVisible || !isWordLimitVisible">
            <slot name="suffix" />
            <fz-svg-icon v-if="suffixIcon" :icon="suffixIcon" :class="ns.e('icon')" />
          </template>
          <fz-svg-icon
            v-if="showClear"
            :class="[ns.e('icon'), ns.e('clear')]"
            :icon="IconXCircle"
            @click="clear"
          />
          <fz-svg-icon
            v-if="showPwdVisible"
            :class="[ns.e('icon'), ns.e('password')]"
            :icon="passwordIcon"
            @click="handlePasswordVisible"
          />

          <span v-if="isWordLimitVisible" :class="ns.e('count')">
            <span :class="ns.e('count-inner')">
              {{ textLength }} / {{ attrs.maxlength }}
            </span>
          </span>
          <fz-svg-icon
            v-if="validateState && validateIcon && needStatusIcon"
            :class="[
              ns.e('icon'),
              ns.e('validateIcon'),
              ns.is('loading', validateState === 'validating')
            ]"
            :icon="validateIcon"
          />
        </span>
      </span>
    </div>

    <!-- append slot -->
    <div v-if="$slots.append" :class="ns.be('group', 'append')">
      <slot name="append" />
    </div>
  </div>
</template>
