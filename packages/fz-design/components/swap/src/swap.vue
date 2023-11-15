<script lang="ts" setup>
  import { Props } from './props'
  import { FzSvgIcon } from '../../svg-icon'
  import { computed, ref } from 'vue'

  defineOptions({ name: 'FzSwap' })

  const props = defineProps(Props)
  const emit = defineEmits(['change', 'update:modelValue'])

  const modelValue = ref(props.modelValue);

  const isChecked = computed(() => {
    return modelValue.value === props.activeValue;
  })
  /**
   * 点击切换时执行
   *
   * @param { Object } evt 事件对象
   */
  const handelClick = (evt: MouseEvent): void => {
    modelValue.value = isChecked.value ? props.inactiveValue : props.activeValue;
    emit('update:modelValue', modelValue.value);
    emit('change', modelValue.value, evt);
  }

  /** 类名列表 */
  const classList = computed(() => [
    'fz-swap',
    {
      [`fz-swap--${props.type}`]: !!props.type,
      'is-open': isChecked.value
    }
  ])
</script>

<template>
  <div role="switch" :class="classList" @click="handelClick">
    <fz-svg-icon :icon="isChecked ? iconOn : iconOff" :size="size" />
  </div>
</template>
