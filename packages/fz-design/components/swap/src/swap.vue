<script lang="ts" setup>
  import { Props } from './props'
  import { FzSvgIcon } from '../../svg-icon'
  import { computed } from 'vue'

  defineOptions({ name: 'FzSwap' })

  const props = defineProps(Props)
  const emit = defineEmits(['change'])

  const modelValue = defineModel<boolean>({ default: false, type: Boolean })

  /**
   * 点击切换时执行
   *
   * @param { Object } evt 事件对象
   */
  const handelClick = (evt: MouseEvent): void => {
    modelValue.value = !modelValue.value
    emit('change', modelValue.value, evt)
  }

  /** 类名列表 */
  const classList = computed(() => [
    'fz-swap',
    {
      [`fz-swap--${props.type}`]: !!props.type,
      'is-open': modelValue.value
    }
  ])
</script>

<template>
  <div role="switch" :class="classList" @click="handelClick">
    <fz-svg-icon :icon="modelValue ? iconOn : iconOff" :size="size" />
  </div>
</template>
