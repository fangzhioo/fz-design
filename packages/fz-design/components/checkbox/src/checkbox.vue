<script lang="ts" setup>
  import { Props } from './props'
  import { computed, inject } from 'vue'
  import { CHANGE_EVENT, FZ_CHECKBOX_GROUP_INJECT_KEY } from '../../../constants'
  import { isArray, isBoolean } from '../../../utils'
  import { useNamespace } from '../../../hooks'

  import type { CheckboxModelValue, CheckboxLabel } from './interface'
  import type { CheckboxGroupProvide } from '../../checkbox-group'
import { useFormSize } from '../../form/src/hooks'

  defineOptions({ name: 'FzCheckbox' })

  const ns = useNamespace('checkbox')
  const prop = defineProps(Props)
  const emit = defineEmits([CHANGE_EVENT])
  const modelValue = defineModel<CheckboxModelValue | CheckboxLabel[]>({
    default: false,
    type: [Boolean, Array]
  })

  /** 当前绑定的值 */
  const keyword = computed({
    get: (): CheckboxModelValue | CheckboxLabel[] => {
      return (parentInject && parentInject.modelValue) || prop.modelValue
    },
    set: (val: CheckboxModelValue | CheckboxLabel[]): void => {
      if (!parentInject) {
        modelValue.value = val
        emit(CHANGE_EVENT, val)
        return
      }
      parentInject.setChange(val)
    }
  })

  /** 获取父组件注入的依赖项 */
  const parentInject = inject<CheckboxGroupProvide | null>(
    FZ_CHECKBOX_GROUP_INJECT_KEY,
    null
  )

  const checkboxSize = useFormSize(parentInject?.size || prop.size)

  /** 是否被选中 */
  const isActive = computed((): boolean => {
    /** 绑定值 */
    const value: CheckboxModelValue | CheckboxLabel[] = keyword.value

    if (isArray(value)) {
      return value.includes(prop.label as never)
    } else if (isBoolean(value)) {
      return value as boolean
    }

    return value === prop.label
  })

  /** 父级是否带有禁用 */
  const isParentDisabled = computed(
    (): boolean => !!(parentInject && parentInject.disabled)
  )

  /** 判断是否被禁用 */
  const isDisabled = computed((): boolean => prop.disabled || isParentDisabled.value)

  /** 类名列表 */
  const classList = computed(() => [
    ns.b(),
    ns.m(checkboxSize.value),
    ns.is('checked', isActive.value),
    ns.is('disabled', isDisabled.value)
  ])
</script>

<template>
  <label
    role="checkbox"
    aria-checked="false"
    tabindex="0"
    aria-labelledby="chk1-label"
    :class="classList"
  >
    <input
      v-model="keyword"
      type="checkbox"
      :class="ns.e('input')"
      hidden
      :value="label"
      :disabled="isDisabled"
    />
    <!-- 选择框 -->
    <span v-if="!(parentInject && parentInject.background)" :class="ns.e('box')" />

    <!-- 文字内容 -->
    <span :class="ns.e('text')">
      <slot />
      <template v-if="!$slots.default && showLabel">{{ label }}</template>
    </span>
  </label>
</template>
