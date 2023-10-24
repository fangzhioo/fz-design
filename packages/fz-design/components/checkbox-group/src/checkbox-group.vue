<script lang="ts" setup>
  import { computed, provide, reactive, toRefs } from 'vue'
  import { Props } from './props'
  import { useNamespace } from '../../../hooks'
  import { useFormSize } from '../../form/src/hooks'
  import { addUnit } from '../../../utils'

  import type { StyleValue } from 'vue'
import { CHANGE_EVENT, FZ_CHECKBOX_GROUP_INJECT_KEY } from '../../../constants'
import type { CheckboxGroupProvide } from './interface'
import type { CheckboxLabel } from '../../checkbox'

  defineOptions({ name: 'FzCheckboxGroup' })

  const ns = useNamespace('checkbox-group')
  const prop = defineProps(Props)
  const emit = defineEmits([CHANGE_EVENT])
  const modelValue = defineModel<CheckboxLabel[] | CheckboxLabel>({
    default: [],
    type: [Boolean, Array, String, Number]
  })

  const checkboxGroupSize = useFormSize(prop.size)

    /**
   * 绑定值发生改变时候触
   *
   * @param { string[] } val 最新值
   */
   const setChange = (val: CheckboxLabel[] | CheckboxLabel): void => {
    modelValue.value = val
    emit(CHANGE_EVENT, val)
  }
  
  /** 获取需要注入的依赖项 */
  provide<CheckboxGroupProvide>(
    FZ_CHECKBOX_GROUP_INJECT_KEY,
    reactive({
      ...toRefs(prop),
      setChange
    })
  )

  /** 类名列表 */
  const classList = computed(() => [
    ns.b(),
    ns.m(checkboxGroupSize.value),
    ns.is('disabled', prop.disabled),
    ns.is('background', !!prop.background),
    ns.is('vertical', prop.vertical)
  ])

  /** 样式列表 */
  const styleList = computed<StyleValue>(() =>
    ns.cssVarBlock({
      'column-gap': addUnit(prop.columnGap),
      'row-gap': addUnit(prop.rowGap)
    })
  )
</script>

<template>
  <div role="group" aria-label="checkbox-group" :class="classList" :style="styleList">
    <slot />
  </div>
</template>
