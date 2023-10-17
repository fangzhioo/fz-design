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
      'fz-text--' + type,
      'fz-text--' + size,
      {
        'is-ellipsis': ellipsis,
        'is-line-clamp': !isUndefined(lineClamp),
      }
    ]"
    :style="{ '-webkit-line-clamp': lineClamp }"
  >
    <slot />
  </component>
</template>
