<script lang="ts" setup>
  import { Props, Emits } from './props'
  import { FzSvgIcon } from '../../svg-icon'
  import { FzButton } from '../../button'
  import { FzSwap } from '../../swap'
  import { ref, toRefs, computed, watchEffect, useSlots } from 'vue'
  import { IconEyeOff, IconEye, IconX, IconSearch } from '@fz-design/fz-design-icon'

  import type { InputType } from './interface'
  import { BLUR_EVENT, CHANGE_EVENT, FOCUS_EVENT, INPUT_EVENT } from '../../../constants'
  import { useFormSize } from '../../form/src/hooks'

  defineOptions({ name: 'FzInput' })

  const props = defineProps(Props)
  const emit = defineEmits(Emits)
  const slots = useSlots()
  const modelValue = defineModel<string | number>({
    default: '',
    type: [String, Number]
  })

  const inputSize = useFormSize(props.size)

  const handleInput = (): void => {
    emit(INPUT_EVENT, modelValue.value)
  }

  const handleClear = (): void => {
    modelValue.value = ''
    emit('clear')
  }

  const handleChange = (): void => {
    emit(CHANGE_EVENT, modelValue.value)
  }

  const handleBlur = (evt: FocusEvent): void => {
    emit(BLUR_EVENT, evt)
  }

  const handleFocus = (evt: FocusEvent): void => {
    emit(FOCUS_EVENT, evt)
  }

  /** 是否展示密码 */
  const showPass = ref<boolean>(false)

  /** type 类型 */
  const inputType = ref<InputType>(props.type)

  watchEffect((): void => {
    inputType.value = props.type
  })

  /**
   * 点击搜索
   *
   * @see KeyboardEvent https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent
   * @param { Object } evt 事件对象
   */
  const handleSearch = (evt: MouseEvent | KeyboardEvent): void => {
    // run(props.onSearch, modelValue.value, evt)
    emit('search', modelValue.value, evt)
  }

  /**
   * 按下回车
   *
   * @param { Object } evt 事件对象
   */
  const handleEnter = (evt: KeyboardEvent): void => {
    const { search } = toRefs(props)

    if (search.value) {
      handleSearch(evt)
    }
  }

  /** 查看密码 */
  const handleShowPassword = (): void => {
    inputType.value = showPass.value ? 'text' : 'password'
  }

  /** 类名列表 */
  const classList = computed(() => [
    'fz-input',
    {
      [`fz-input--${inputSize.value}`]: inputSize.value,
      'is-disabled': props.disabled,
      'is-search': props.search,
      'is-hidden': props.type === 'hidden',
      'is-before': slots.before,
      'is-after': slots.after || props.search
    }
  ])
</script>

<template>
  <div role="input" :class="classList">
    <!-- 前缀插槽 -->
    <div v-if="$slots.before" class="fz-input__before">
      <slot name="before" />
    </div>

    <!-- 容器盒子 -->
    <div class="fz-input__wrapper">
      <!-- 前缀 -->
      <div class="fz-input__prefix">
        <!-- icon -->
        <fz-svg-icon
          v-if="prefixIcon"
          class="fz-input__prefix-icon"
          :icon="prefixIcon"
          :size="14"
        />
      </div>

      <!-- 输入框 -->
      <input
        v-model="modelValue"
        class="fz-input__inner"
        :type="inputType"
        :maxlength="maxlength"
        :disabled="disabled"
        :readonly="readonly"
        :autofocus="autofocus"
        :autocomplete="autocomplete"
        :name="name"
        :placeholder="placeholder"
        @input="handleInput"
        @change="handleChange"
        @keyup.enter="handleEnter"
        @blur="handleBlur"
        @focus="handleFocus"
      />

      <!-- 后缀 -->
      <div class="fz-input__suffix">
        <!-- 清除 icon -->
        <fz-svg-icon
          v-if="clearable"
          class="fz-input__clear-btn"
          :icon="IconX"
          :size="14"
          @click="handleClear"
        />

        <!-- 自定义 icon -->
        <fz-svg-icon
          v-if="suffixIcon"
          class="fz-input__suffix-icon"
          :icon="suffixIcon"
          :size="14"
        />

        <!-- 查看密码 -->
        <fz-swap
          v-if="showPassword"
          v-model="showPass"
          class="fz-input__show-password"
          type="swap"
          :icon-on="IconEye"
          :icon-off="IconEyeOff"
          :size="14"
          @change="handleShowPassword"
        />
      </div>
    </div>

    <!-- 后缀插槽 -->
    <div v-if="$slots.after || search" class="fz-input__after">
      <!-- 搜索框 -->
      <div v-if="search" class="fz-input__search" @click="handleSearch">
        <slot name="searchBtn">
          <fz-button type="primary" :icon="IconSearch" :size="inputSize"></fz-button>
        </slot>
      </div>
      <slot v-else name="after" />
    </div>
  </div>
</template>
