<template>
  <slot />
</template>

<script lang="ts">
import { FZ_POPPER_INJECT_KEY } from '@fzui/constants';
import { defineComponent, provide, ref } from 'vue';

export default defineComponent({
  name: 'FzPopperProvider',
  inheritAttrs: false,
  setup() {
    const popperProvides = {
      triggerRef: ref<HTMLElement | null>(null),
      popperInstanceRef: ref<HTMLElement | null>(null),
      contentRef: ref<HTMLElement | null>(null),
    };

    provide(FZ_POPPER_INJECT_KEY, popperProvides);

    return popperProvides;
  },
});
</script>
