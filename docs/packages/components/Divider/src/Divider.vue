<template>
  <div :class="['fz-divider', `fz-divider--${direction}`]" :style="dividerStyle" role="separator">
    <div v-if="$slots.default && direction !== 'vertical'" :class="['fz-divider__text', `is-${contentPosition}`]">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, CSSProperties, defineComponent } from 'vue';
import { dividerProps } from './Divider';

export default defineComponent({
  name: 'FzDivider',
  props: dividerProps,
  setup(props) {
    const dividerStyle = computed(() => {
      return {
        '--fz-border-style': props.borderStyle,
      } as CSSProperties;
    });
    return {
      dividerStyle,
    };
  },
});
</script>
