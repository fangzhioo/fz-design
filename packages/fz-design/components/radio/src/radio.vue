<script lang="ts" setup>
  import { CHANGE_EVENT, FZ_RADIO_GROUP_INJECT_KEY } from '../../../constants'
  import { Props } from './props'
  import { computed, inject } from 'vue'
  import { useNamespace } from '../../../hooks'
  import type { RadioModelValue } from './interface'
  import type { RadioGroupInjectContext } from '../../radio-group'
  import { useFormSize } from '../../form/src/hooks'

  defineOptions({ name: 'FzRadio' })

  const prop = defineProps(Props)
  const emit = defineEmits([CHANGE_EVENT])
  const modelValue = defineModel<RadioModelValue>({
    default: null,
    type: [String, Number, Boolean]
  })
  /** 获取父组件注入的依赖项 */
  const parentInject = inject<RadioGroupInjectContext | null>(
    FZ_RADIO_GROUP_INJECT_KEY,
    null
  )

  const ns = useNamespace('radio')
  const radioSize = useFormSize(parentInject?.size || prop.size)

  /** 当前绑定的值 */
  const keyword = computed({
    get: (): RadioModelValue => {
      return (parentInject && parentInject.modelValue) || prop.modelValue
    },
    set: (val: RadioModelValue): void => {
      /** 判断如果注入的依赖项存在，并且没有禁用，则将最新值传递给父组件 */
      if (parentInject && !isParentDisabled.value) {
        parentInject?.changeEvent?.(val)
        return
      }
      if (isDisabled.value) return
      modelValue.value = val
      emit(CHANGE_EVENT, val)
    }
  })

  /** 判断是否被选中 */
  const isChecked = computed((): boolean => keyword.value === prop.label)

  /** 父级是否带有禁用 */
  const isParentDisabled = computed(
    (): boolean => !!(parentInject && parentInject.disabled)
  )

  /** 判断是否被禁用 */
  const isDisabled = computed((): boolean => prop.disabled || isParentDisabled.value)

  /** 类名列表 */
  const classList = computed(() => [
    ns.b(),
    ns.m(radioSize.value),
    ns.is('disabled', isDisabled.value),
    ns.is('checked', isChecked.value),
    ns.is('background', !!parentInject?.background)
  ])
</script>

<template>
  <label role="radio" aria-checked="false" tabindex="0" :class="classList">
    <input
      v-model="keyword"
      hidden
      type="radio"
      :value="label"
      :disabled="disabled"
      :name="name"
    />
    <!-- 小圆圈 -->
    <span v-if="!parentInject?.background" :class="ns.e('circle')" />

    <!-- 展示的文字内容 -->
    <span :class="ns.e('text')">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>
