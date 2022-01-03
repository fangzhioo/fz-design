<template>
  <footer class="fz-footer" :style="style">
    <slot></slot>
  </footer>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue';

import type { CSSProperties } from 'vue';

export default defineComponent({
  name: 'FzFooter',
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
                '--fz-footer-height': props.height,
              }
            : {}) as CSSProperties,
      ),
    };
  },
});
</script>
