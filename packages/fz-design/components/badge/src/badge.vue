<script lang="ts" setup>
import { computed } from 'vue'

import { Props } from './props'
import { useNamespace } from '../../../hooks';
import { isNumber } from '../../../utils';

defineOptions({
  name: 'FzBadge'
})

const props = defineProps(Props)

const ns = useNamespace('badge')

const content = computed<string>(() => {
  if (props.dot) return ''

  if (isNumber(props.value) && isNumber(props.max)) {
    return (props.max as number) < (props.value as number) ? `${props.max}+` : `${props.value}`
  }
  return `${props.value}`
})

defineExpose({
  /**  badge content */
  content
})
</script>

<template>
  <div :class="ns.b()">
    <slot />
    <transition :name="`${ns.namespace}-zoom-in-center`">
      <sup
        v-show="!hidden && (content || dot)"
        :class="[
          ns.e('content'),
          ns.em('content', type),
          ns.is('fixed', !!$slots.default),
          ns.is('dot', dot),
        ]"
        v-text="content"
      />
    </transition>
  </div>
</template>
