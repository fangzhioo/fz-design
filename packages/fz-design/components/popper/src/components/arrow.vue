<script lang="ts" setup>
  import { inject, onBeforeUnmount, watch } from 'vue'
  import { FZ_POPPER_CONTENT_INJECT_KEY } from '../../../../constants'
  import { popperArrowProps } from './arrow'
  import { useNamespace } from '../../../../hooks'

  defineOptions({
    name: 'FzPopperArrow',
    inheritAttrs: false
  })

  const props = defineProps(popperArrowProps)

  const ns = useNamespace('popper')
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { arrowOffset, arrowRef, arrowStyle } = inject<any>(
    FZ_POPPER_CONTENT_INJECT_KEY,
    undefined
  )!

  watch(
    () => props.arrowOffset,
    val => {
      arrowOffset.value = val
    }
  )
  onBeforeUnmount(() => {
    arrowRef.value = undefined
  })

  defineExpose({
    /**
     * @description Arrow element
     */
    arrowRef
  })
</script>

<template>
  <span ref="arrowRef" :class="ns.e('arrow')" :style="arrowStyle" data-popper-arrow />
</template>
