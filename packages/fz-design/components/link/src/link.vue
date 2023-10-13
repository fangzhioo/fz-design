<script lang="ts" setup>
  import { Props } from './props'
  import SvgIcon from '../../svg-icon';
  defineOptions({name: 'FzLink'})

  const prop = defineProps(Props)
  const emit = defineEmits({
    click: (evt: MouseEvent) => evt instanceof MouseEvent
  })

  const handleClick = (event: MouseEvent): void => {
    if (!prop.disabled) emit('click', event)
  }
</script>

<template>
  <a
    class="fz-link"
    :class="[
      'fz-link--' + type,
      {
        'is-disabled': disabled,
        'is-underline': underline && !disabled
      }
    ]"
    :href="disabled || !href ? undefined : href"
    @click="handleClick"
  >
    <svg-icon v-if="icon"><component :is="icon" /></svg-icon>
    <span v-if="$slots.default" class="fz-link__inner">
      <slot />
    </span>

    <slot v-if="$slots.icon" name="icon" />
  </a>
</template>
