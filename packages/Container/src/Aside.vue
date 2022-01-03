<template>
  <aside class="fz-aside" :style="style">
    <slot></slot>
  </aside>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue';

import type { CSSProperties } from 'vue';

export default defineComponent({
  name: 'FzAside',
  props: {
    width: {
      type: String,
      default: null,
    },
  },
  setup(props) {
    return {
      style: computed(() => {
        return props.width ? ({ '--fz-aside-width': props.width } as CSSProperties) : {};
      }),
    };
  },
});
</script>
