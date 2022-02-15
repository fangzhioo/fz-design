<template>
  <div
    ref="popperContentRef"
    :style="contentStyle"
    :class="contentClass"
    role="tooltip"
    @mouseenter="(e) => $emit('mouseenter', e)"
    @mouseleave="(e) => $emit('mouseleave', e)"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, inject, provide, unref, onMounted, watch } from 'vue';
import { createPopper } from '@popperjs/core';
import { FZ_POPPER_CONTENT_INJECT_KEY, FZ_POPPER_INJECT_KEY } from '@fzui/constants';
import { useZIndex } from '@fzui/hooks';
import { popperContentProps, PopperjsCoreOptions } from './Popper';
import { buildPopperOptions, unwrapMeasurableEl } from './utils';

export default defineComponent({
  name: 'FzPopperContent',
  props: popperContentProps,
  emits: ['mouseenter', 'mouseleave'],
  setup(props) {
    const { triggerRef, popperInstanceRef, contentRef } = inject<any>(FZ_POPPER_INJECT_KEY, undefined)!;
    const { nextZIndex } = useZIndex();
    // const ns = useNamespace('popper');
    const popperContentRef = ref<HTMLElement | null>(null);
    const arrowRef = ref<HTMLElement | null>(null);
    const arrowOffset = ref<number>();
    provide(FZ_POPPER_CONTENT_INJECT_KEY, {
      arrowRef,
      arrowOffset,
    });
    const contentZIndex = ref(props.zIndex || nextZIndex());

    const contentStyle = computed(() => [{ zIndex: unref(contentZIndex) }, props.popperStyle] as any);

    const contentClass = computed(() => ['fz-popper', { 'is-pure': props.pure }, `is-${props.effect}`, props.popperClass]);

    const createPopperInstance = ({ referenceEl, popperContentEl, arrowEl }: any) => {
      const options = buildPopperOptions(props, {
        arrowEl,
        arrowOffset: unref(arrowOffset),
      }) as PopperjsCoreOptions;

      return createPopper(referenceEl, popperContentEl, options);
    };

    const updatePopper = () => {
      unref(popperInstanceRef)?.update();
      contentZIndex.value = props.zIndex || nextZIndex();
    };

    onMounted(() => {
      let updateHandle: ReturnType<typeof watch>;
      watch(
        () => unwrapMeasurableEl(props.referenceEl) || unref(triggerRef),
        (val) => {
          updateHandle?.();
          if (val) {
            popperInstanceRef.value?.destroy();
            const popperContentEl = unref(popperContentRef)!;
            contentRef.value = popperContentEl;
            const arrowEl = unref(arrowRef);

            const newInstance = createPopperInstance({
              referenceEl: val,
              popperContentEl: unref(popperContentRef)!,
              arrowEl,
            });
            popperInstanceRef.value = newInstance;

            updateHandle = watch(
              () => val!.getBoundingClientRect(),
              () => {
                updatePopper();
              },
              {
                immediate: true,
              },
            );
          } else {
            popperInstanceRef.value = null;
          }
        },
        {
          immediate: true,
        },
      );

      watch(
        () =>
          buildPopperOptions(props, {
            arrowEl: unref(arrowRef),
            arrowOffset: unref(arrowOffset),
          }),
        (option) => popperInstanceRef.value?.setOptions(option),
      );
    });

    return {
      popperContentRef,
      popperInstanceRef,
      contentStyle,
      contentClass,
      updatePopper,
    };
  },
});
</script>
