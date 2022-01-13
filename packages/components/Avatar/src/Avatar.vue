<template>
  <span
    class="fz-avatar"
    :class="[
      size ? `fz-avatar--${size}` : '',
      shape ? `fz-avatar--${shape}` : '',
      {
        'fz-avatar--icon': icon,
      },
    ]"
    :style="sizeStyle"
  >
    <img v-if="(src || srcSet) && !hasLoadError" :src="src" :alt="alt" :srcset="srcSet" :style="fitStyle" @error="handleError" />
    <fz-icon v-else-if="icon" :name="icon" />
    <slot v-else></slot>
  </span>
</template>

<script lang="ts">
import { computed, CSSProperties, defineComponent, ref, watch } from 'vue';
import { avatarEmits, avatarProps } from './Avatar';

import { Icon } from '@fzui/components/Icon';

export default defineComponent({
  name: 'FzAvatar',
  components: {
    FzIcon: Icon,
  },
  props: avatarProps,
  emits: avatarEmits,
  setup(props, { emit }) {
    const hasLoadError = ref(false);

    const sizeStyle = computed<any>(() => {
      const { size } = props;
      return typeof size === 'number'
        ? {
            '--fz-avatar-size': `${size}px`,
          }
        : {};
    });

    const fitStyle = computed<CSSProperties>(() => ({
      objectFit: props.fit,
    }));

    // need reset hasLoadError to false if src changed
    watch(
      () => props.src,
      () => (hasLoadError.value = false),
    );

    function handleError(e: Event) {
      hasLoadError.value = true;
      emit('error', e);
    }

    return {
      hasLoadError,
      sizeStyle,
      fitStyle,
      handleError,
    };
  },
});
</script>
