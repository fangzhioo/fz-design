<template>
  <header class="fz-header" :style="style">
    <slot></slot>
  </header>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue';

import type { CSSProperties } from 'vue';

export default defineComponent({
  name: 'FzHeader',
  props: {
    height: {
      type: String,
      default: null,
    },
  },
  setup(props) {
    return {
      style: computed(
        () =>
          (props.height
            ? {
                '--fz-header-height': props.height,
              }
            : {}) as CSSProperties,
      ),
    };
  },
});
</script>
