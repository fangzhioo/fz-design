<script lang="ts" setup>
  import { Props } from './props'
  import SvgIcon from '../../svg-icon'
  import { useNamespace } from '../../../hooks'
  import { computed } from 'vue'

  defineOptions({ name: 'FzLink' })

  const ns = useNamespace('link')
  const prop = defineProps(Props)
  const emit = defineEmits({
    click: (evt: MouseEvent) => evt instanceof MouseEvent
  })

  const handleClick = (event: MouseEvent): void => {
    if (!prop.disabled) emit('click', event)
  }

  const linkKls = computed(() => [
    ns.b(),
    ns.m(prop.type),
    ns.is('disabled', prop.disabled),
    ns.is('underline', prop.underline && !prop.disabled)
  ])
</script>

<template>
  <a :class="linkKls" :href="disabled || !href ? undefined : href" @click="handleClick">
    <svg-icon v-if="icon" :icon="icon" />
    <span v-if="$slots.default" :class="ns.e('inner')">
      <slot />
    </span>

    <slot v-if="$slots.icon" name="icon" />
  </a>
</template>
