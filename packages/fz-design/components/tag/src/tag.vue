<script lang="ts" setup>
import { computed } from 'vue'
import { FzSvgIcon } from '../..'
import { IconX } from '@fz-design/fz-design-icon'
import { Emits, Props } from './props'
import { useFormSize } from '../../form/src/hooks';
import { useNamespace } from '../../../hooks';

defineOptions({
  name: 'FzTag'
})
const props = defineProps(Props)
const emit = defineEmits(Emits)

const tagSize = useFormSize()
const ns = useNamespace('tag')
const containerKls = computed(() => {
  const { type, hit, effect, closable, round } = props
  return [
    ns.b(),
    ns.is('closable', closable),
    ns.m(type),
    ns.m(tagSize.value),
    ns.m(effect),
    ns.is('hit', hit),
    ns.is('round', round)
  ]
})

// methods
const handleClose = (event: MouseEvent): void => {
  emit('close', event)
}

const handleClick = (event: MouseEvent): void => {
  emit('click', event)
}
</script>

<template>
  <span
    v-if="disableTransitions"
    :class="containerKls"
    :style="{ backgroundColor: color }"
    @click="handleClick"
  >
    <span :class="ns.e('content')">
      <slot />
    </span>
    <fz-svg-icon v-if="closable" :class="ns.e('close')" :icon="IconX" @click.stop="handleClose" />
  </span>
  <transition v-else :name="`${ns.namespace.value}-zoom-in-center`" appear>
    <span
      :class="containerKls"
      :style="{ backgroundColor: color }"
      @click="handleClick"
    >
      <span :class="ns.e('content')">
        <slot />
      </span>
      <fz-svg-icon v-if="closable" :class="ns.e('close')" :icon="IconX" @click.stop="handleClose" />
    </span>
  </transition>
</template>
