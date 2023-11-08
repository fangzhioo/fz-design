<script lang="ts" setup>
import { computed, provide, ref } from 'vue'
import { FZ_POPPER_INJECT_KEY } from '../../../constants'
import { Props } from './props'

import type { FzPopperInjectionContext } from './interface'

type PopperInstance = any

defineOptions({
  name: 'FzPopper',
  inheritAttrs: false
})
const props = defineProps(Props)

const triggerRef = ref<HTMLElement>()
const popperInstanceRef = ref<PopperInstance>()
const contentRef = ref<HTMLElement>()
const referenceRef = ref<HTMLElement>()
const role = computed(() => props.role)

const popperProvides = {
  /**
   * @description trigger element
   */
  triggerRef,
  /**
   * @description popperjs instance
   */
  popperInstanceRef,
  /**
   * @description popper content element
   */
  contentRef,
  /**
   * @description popper reference element
   */
  referenceRef,
  /**
   * @description role determines how aria attributes are distributed
   */
  role
} as FzPopperInjectionContext

defineExpose(popperProvides)

provide(FZ_POPPER_INJECT_KEY, popperProvides)
</script>

<template>
  <slot />
</template>
