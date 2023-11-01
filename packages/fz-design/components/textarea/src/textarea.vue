<script lang="ts" setup>
  import type { StyleValue } from 'vue'
  import { computed, nextTick, onMounted, ref, shallowRef, useAttrs, watch } from 'vue'
  import { useCursor, useNamespace } from '../../../hooks'
  import { Props } from './props'
  import { isClient, isNil, isObject, warning } from '../../../utils'
  import {
    BLUR_EVENT,
    CHANGE_EVENT,
    FOCUS_EVENT,
    INPUT_EVENT,
    UPDATE_MODEL_EVENT
  } from '../../../constants'
  import { calcTextareaHeight } from './utils'

  defineOptions({ name: 'FzTextarea' })
  const ns = useNamespace('textarea')

  const prop = defineProps(Props)
  const emit = defineEmits([
    UPDATE_MODEL_EVENT,
    CHANGE_EVENT,
    INPUT_EVENT,
    BLUR_EVENT,
    FOCUS_EVENT,
    'keydown',
    'clear'
  ])
  const attrs = useAttrs()
  const countStyle = ref<StyleValue>()
  const textarea = shallowRef<HTMLTextAreaElement>()
  const textareaCalcStyle = shallowRef<StyleValue>({})

  const nativeInputValue = computed(() =>
    isNil(prop.modelValue) ? '' : String(prop.modelValue)
  )
  const textLength = computed(() => nativeInputValue.value.length)

  const isDisabled = computed(() => prop.disabled)
  const isWordLimitVisible = computed(
    () => !!prop.maxlength && !isDisabled.value && !prop.readonly
  )
  const inputExceed = computed(
    () =>
      // show exceed style if length of initial value greater then maxlength
      !!isWordLimitVisible.value && textLength.value > Number(prop.maxlength)
  )
  const textareaStyle = computed<StyleValue>(() => [
    prop.textareaStyle,
    textareaCalcStyle.value,
    { resize: prop.resize } as StyleValue
  ]);

  /** 类名列表 */
  const classList = computed(() => [
    ns.b(),
    ns.is('disabled', isDisabled.value),
    ns.is('exceed', inputExceed.value)
  ])

  const [recordCursor, setCursor] = useCursor(textarea)

  const setNativeInputValue = (): void => {
    const input = textarea.value
    const formatterValue = prop.formatter
      ? prop.formatter(nativeInputValue.value)
      : nativeInputValue.value
    if (!input || input.value === formatterValue) return
    input.value = formatterValue
  }

  const resizeTextarea = (): void => {
    const { autosize } = prop

    if (!isClient) return

    if (autosize) {
      const minRows = isObject(autosize) ? autosize.minRows : undefined
      const maxRows = isObject(autosize) ? autosize.maxRows : undefined
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const textareaStyle = calcTextareaHeight(textarea.value!, minRows, maxRows)

      // If the scrollbar is displayed, the height of the textarea needs more space than the calculated height.
      // If set textarea height in this case, the scrollbar will not hide.
      // So we need to hide scrollbar first, and reset it in next tick.
      // see https://github.com/element-plus/element-plus/issues/8825
      textareaCalcStyle.value = {
        overflowY: 'hidden',
        ...textareaStyle
      }

      nextTick(() => {
        // NOTE: Force repaint to make sure the style set above is applied.
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        textarea.value!.offsetHeight
        textareaCalcStyle.value = textareaStyle as StyleValue
      })
    } else {
      textareaCalcStyle.value = {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        minHeight: calcTextareaHeight(textarea.value!).minHeight
      }
    }
  }

  const handleInput = async (event: Event): Promise<void> => {
    recordCursor()

    let { value } = event.target as HTMLTextAreaElement

    if (prop.formatter) {
      value = prop.parser ? prop.parser(value) : value
    }

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
    emit(CHANGE_EVENT, (event.target as HTMLTextAreaElement).value)
  }

  const handleKeydown = (evt: KeyboardEvent): void => {
    emit('keydown', evt)
  }

  const handleBlur = (evt: FocusEvent): void => {
    emit(BLUR_EVENT, evt)
  }

  const handleFocus = (evt: FocusEvent): void => {
    emit(FOCUS_EVENT, evt)
  }

  const select = (): void => {
    textarea.value?.select()
  }

  const clear = (): void => {
    emit(UPDATE_MODEL_EVENT, '')
    emit(CHANGE_EVENT, '')
    emit(INPUT_EVENT, '')
    emit('clear')
  }

  const focus = async (): Promise<void> => {
    // see: https://github.com/ElemeFE/element/issues/18573
    await nextTick()
    textarea.value?.focus()
  }

  const blur = (): void => textarea.value?.blur()

  watch(nativeInputValue, () => setNativeInputValue())

  onMounted(() => {
    if (!prop.formatter && prop.parser) {
      warning('FzTextarea', 'If you set the parser, you also need to set the formatter.')
    }
    setNativeInputValue()
    nextTick(resizeTextarea)
  })

  defineExpose({
    textarea,
    /**  HTML input element native method */
    focus,
    /**  HTML input element native method */
    blur,
    /**  HTML input element native method */
    select,
    /**  clear input value */
    clear,
    /**  resize textarea. */
    resizeTextarea
  })
</script>

<template>
  <div :class="classList">
    <textarea
      ref="textarea"
      :class="ns.e('inner')"
      :style="textareaStyle"
      v-bind="attrs"
      :tabindex="tabindex"
      :disabled="isDisabled"
      :readonly="readonly"
      :autocomplete="autocomplete"
      :aria-label="label"
      :placeholder="placeholder"
      :autofocus="autofocus"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      @change="handleChange"
      @keydown="handleKeydown"
    />
    <span v-if="isWordLimitVisible" :style="countStyle" :class="ns.e('count')">
      {{ textLength }} / {{ maxlength }}
    </span>
  </div>
</template>
