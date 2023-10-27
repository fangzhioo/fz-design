<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { Emits, Props } from './props'
import { FzSvgIcon } from '../..'
import { useNamespace } from '../../../hooks';
import { addUnit, isNumber, isString } from '../../../utils';

import type { CSSProperties } from 'vue'

defineOptions({
  name: 'FzAvatar'
})

const props = defineProps(Props)
const emit = defineEmits(Emits)

const ns = useNamespace('avatar')

const hasLoadError = ref(false)

const avatarClass = computed(() => {
  const { size, icon, shape } = props
  const classList = [ns.b()]
  if (isString(size)) classList.push(ns.m(size as string))
  if (icon) classList.push(ns.m('icon'))
  if (shape) classList.push(ns.m(shape))
  return classList
})

const sizeStyle = computed(() => {
  const { size } = props
  return isNumber(size)
    ? (ns.cssVarBlock({
        size: addUnit(size) || ''
      }) as CSSProperties)
    : undefined
})

const fitStyle = computed<CSSProperties>(() => ({
  objectFit: props.fit
} as CSSProperties))

// need reset hasLoadError to false if src changed
watch(
  () => props.src,
  () => (hasLoadError.value = false)
)

function handleError (e: Event): void {
  hasLoadError.value = true
  emit('error', e)
}
</script>

<template>
  <span :class="avatarClass" :style="sizeStyle">
    <img
      v-if="(src || srcSet) && !hasLoadError"
      :src="src"
      :alt="alt"
      :srcset="srcSet"
      :style="fitStyle"
      @error="handleError"
    />
    <fz-svg-icon v-else-if="icon" :icon="icon" />
    <slot v-else />
  </span>
</template>
