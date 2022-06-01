<template>
  <div class="fz-slider__marks-text" :style="style">
    {{ label }}
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, StyleValue } from 'vue';
import { get } from '@fzui/utils';
import type { PropType } from 'vue';

export default defineComponent({
  name: 'FzMarker',
  props: {
    mark: {
      type: [String, Object] as PropType<string | Record<string, unknown>>,
      default: () => undefined,
    },
  },
  setup(props) {
    const label = computed(() => {
      return typeof props.mark === 'string' ? props.mark : props.mark?.label;
    });

    const style = computed<StyleValue>(() => {
      const markStyle = get(props, 'mark.style', {}) as StyleValue;
      return markStyle;
    });

    return {
      label,
      style,
    };
  },
});
</script>
