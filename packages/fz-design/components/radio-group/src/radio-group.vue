<script lang="ts" setup>
  import { Props } from './props'
  import { computed, provide, reactive, toRefs } from 'vue'
  import { CHANGE_EVENT, FZ_RADIO_GROUP_INJECT_KEY } from '../../../constants'
  import { useNamespace } from '../../../hooks'
  
  import type { StyleValue } from 'vue'
  import type { RadioModelValue } from '../../radio'
  import type { RadioGroupInjectContext } from './interface'
import { useFormSize } from '../../form/src/hooks'

  defineOptions({ name: 'FzRadioGroup' })

  const prop = defineProps(Props)
  const emit = defineEmits([CHANGE_EVENT])
  const modelValue = defineModel<RadioModelValue>({
    default: '',
    type: [String, Number, Boolean]
  })
  const ns = useNamespace('radio-group')

  const radioGroupSize = useFormSize(prop.size)

  /**
   * 改变同步数据
   *
   * @param { string | number | boolean } value 最新值
   */
  const changeEvent = (value: RadioModelValue): void => {
    modelValue.value = value
    emit(CHANGE_EVENT, value)
  }

  /** 类名列表 */
  const classList = computed(() => [
    ns.b(),
    ns.m(radioGroupSize.value),
    ns.is('disabled', prop.disabled),
    ns.is('background', !!prop.background),
    ns.is('vertical', prop.vertical)
  ])

  /** 样式列表 */
  const styleList = computed<StyleValue>(() => ({
    //  styles(['columnGap', 'rowGap'])
  }))

  /** 注入依赖项 */
  provide<RadioGroupInjectContext>(
    FZ_RADIO_GROUP_INJECT_KEY,
    reactive({
      ...toRefs(prop),
      changeEvent
    })
  )
</script>

<template>
  <div role="radiogroup" :class="classList" :style="styleList">
    <slot />
  </div>
</template>
