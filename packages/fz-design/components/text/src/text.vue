<script lang="ts" setup>
  import { Props } from './props'
  import { isUndefined } from '../../../utils';

  defineOptions({name: 'FzText'})

  defineProps(Props)
</script>

<template>
  <component
    :is="tag"
    :class="[
      'fz-text',
      {
        'is-ellipsis': ellipsis,
        'is-line-clamp': !isUndefined(lineClamp),
        [`fz-text--${type}`]: !!type,
        [`fz-text--${size}`]: !!size,
      }
    ]"
    :style="{ '-webkit-line-clamp': lineClamp }"
  >
    <slot />
  </component>
</template>
