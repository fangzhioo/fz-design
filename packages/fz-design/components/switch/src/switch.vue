<script lang="ts" setup>
  import { computed, nextTick, onMounted, ref, watch } from 'vue'
  import { isPromise, isBoolean, throwError, addUnit, warning } from '../../../utils'
  import { FzSvgIcon } from '../../svg-icon'
  import {
    useFormDisabled,
    useFormItem,
    useFormItemInputId,
    useFormSize
  } from '../../form/src/hooks'
  import { IconLoading } from '@fz-design/fz-design-icon'
  import { CHANGE_EVENT, INPUT_EVENT, UPDATE_MODEL_EVENT } from '../../../constants'
  import { Emits, Props } from './props'
  import type { CSSProperties } from 'vue'
  import { useNamespace } from '../../../hooks'

  const COMPONENT_NAME = 'FzSwitch'
  defineOptions({
    name: COMPONENT_NAME
  })

  const props = defineProps(Props)
  const emit = defineEmits(Emits)

  const { formItem } = useFormItem()
  const switchSize = useFormSize()
  const ns = useNamespace('switch')

  const { inputId } = useFormItemInputId(props, {
    formItemContext: formItem
  })

  const switchDisabled = useFormDisabled(computed(() => props.loading))
  const isControlled = ref(props.modelValue !== false)
  const input = ref<HTMLInputElement>()
  const core = ref<HTMLSpanElement>()

  const switchKls = computed(() => [
    ns.b(),
    ns.m(switchSize.value),
    ns.is('disabled', switchDisabled.value),
    ns.is('checked', checked.value)
  ])

  const labelLeftKls = computed(() => [
    ns.e('label'),
    ns.em('label', 'left'),
    ns.is('active', !checked.value)
  ])

  const labelRightKls = computed(() => [
    ns.e('label'),
    ns.em('label', 'right'),
    ns.is('active', checked.value)
  ])

  const coreStyle = computed<CSSProperties>(() => ({
    width: addUnit(props.width)
  }))

  watch(
    () => props.modelValue,
    () => {
      isControlled.value = true
    }
  )

  const actualValue = computed(() => {
    // return isControlled.value ? props.modelValue : props.value
    return props.modelValue
  })

  const checked = computed(() => actualValue.value === props.activeValue)

  if (![props.activeValue, props.inactiveValue].includes(actualValue.value)) {
    emit(UPDATE_MODEL_EVENT, props.inactiveValue)
    emit(CHANGE_EVENT, props.inactiveValue)
    emit(INPUT_EVENT, props.inactiveValue)
  }

  watch(checked, val => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    input.value!.checked = val

    if (props.validateEvent) {
      formItem?.validate?.('change').catch((err: any) => warning(COMPONENT_NAME, err))
    }
  })

  const handleChange = (): void => {
    const val = checked.value ? props.inactiveValue : props.activeValue
    emit(UPDATE_MODEL_EVENT, val)
    emit(CHANGE_EVENT, val)
    emit(INPUT_EVENT, val)
    nextTick(() => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      input.value!.checked = checked.value
    })
  }

  const switchValue = (): void => {
    if (switchDisabled.value) return

    const { beforeChange } = props
    if (!beforeChange) {
      handleChange()
      return
    }

    const shouldChange = beforeChange()

    const isPromiseOrBool = [isPromise(shouldChange), isBoolean(shouldChange)].includes(
      true
    )
    if (!isPromiseOrBool) {
      throwError(
        COMPONENT_NAME,
        'beforeChange must return type `Promise<boolean>` or `boolean`'
      )
    }

    if (isPromise(shouldChange)) {
      shouldChange
        .then(result => {
          if (result) {
            handleChange()
          }
        })
        .catch(e => {
          warning(COMPONENT_NAME, `some error occurred: ${e}`)
        })
    } else if (shouldChange) {
      handleChange()
    }
  }

  const focus = (): void => {
    input.value?.focus?.()
  }

  onMounted(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    input.value!.checked = checked.value
  })

  defineExpose({
    /**
     *  切换focus
     **/
    focus,
    /**
     *  切换状态
     */
    checked
  })
</script>

<template>
  <div :class="switchKls" @click.prevent="switchValue">
    <input
      :id="inputId"
      ref="input"
      :class="ns.e('input')"
      type="checkbox"
      role="switch"
      :aria-checked="checked"
      :aria-disabled="switchDisabled"
      :name="name"
      :true-value="activeValue"
      :false-value="inactiveValue"
      :disabled="switchDisabled"
      :tabindex="tabindex"
      @change="handleChange"
      @keydown.enter="switchValue"
    />
    <span v-if="!inlinePrompt && (inactiveIcon || inactiveText)" :class="labelLeftKls">
      <fz-svg-icon v-if="inactiveIcon" :icon="inactiveIcon" />
      <span v-if="!inactiveIcon && inactiveText" :aria-hidden="checked">
        {{ inactiveText }}
      </span>
    </span>
    <span ref="core" :class="ns.e('core')" :style="coreStyle">
      <div v-if="inlinePrompt" :class="ns.e('inner')">
        <template v-if="activeIcon || inactiveIcon">
          <fz-svg-icon
            :class="ns.is('icon')"
            :icon="checked ? activeIcon : inactiveIcon"
          />
        </template>
        <template v-else-if="activeText || inactiveText">
          <span :class="ns.is('text')" :aria-hidden="!checked">
            {{ checked ? activeText : inactiveText }}
          </span>
        </template>
      </div>
      <div :class="ns.e('action')">
        <fz-svg-icon v-if="loading" :icon="IconLoading" :class="ns.is('loading')" />
        <fz-svg-icon v-else-if="activeActionIcon && checked" :icon="activeActionIcon" />
        <fz-svg-icon
          v-else-if="inactiveActionIcon && !checked"
          :icon="inactiveActionIcon"
        />
      </div>
    </span>
    <span v-if="!inlinePrompt && (activeIcon || activeText)" :class="labelRightKls">
      <fz-svg-icon v-if="activeIcon" :icon="activeIcon" />
      <span v-if="!activeIcon && activeText" :aria-hidden="!checked">
        {{ activeText }}
      </span>
    </span>
  </div>
</template>
