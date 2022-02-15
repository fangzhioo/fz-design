<template>
  <span ref="arrowRef" class="fz-popper__arrow" data-popper-arrow="" />
</template>

<script lang="ts">
import { defineComponent, inject, ref, onMounted, onBeforeUnmount, watch, unref } from 'vue';
import { FZ_POPPER_CONTENT_INJECT_KEY } from '@fzui/constants';
import { popperArrowProps } from './Popper';

export default defineComponent({
  name: 'FzPopperArrow',
  props: popperArrowProps,
  setup(props) {
    const arrowRef = ref<HTMLSpanElement | null>(null);
    const popperContentInjection = inject<any>(FZ_POPPER_CONTENT_INJECT_KEY, undefined)!;

    watch(
      () => props.arrowOffset,
      (val) => {
        popperContentInjection.arrowOffset.value = val;
      },
    );

    onMounted(() => {
      popperContentInjection.arrowRef.value = unref(arrowRef);
    });

    onBeforeUnmount(() => {
      popperContentInjection.arrowRef.value = null;
    });

    return {
      arrowRef,
    };
  },
});
</script>
