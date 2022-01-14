<template>
  <div ref="scrollbarRef" class="fz-scrollbar">
    <div ref="wrapRef" :class="[wrapClass, 'fz-scrollbar__wrap', native ? '' : 'fz-scrollbar__wrap--hidden-default']" :style="style" @scroll="handleScroll">
      <component :is="tag" ref="resizeRef" :class="['fz-scrollbar__view', viewClass]" :style="viewStyle">
        <slot />
      </component>
    </div>
    <template v-if="!native">
      <bar :move="moveX" :ratio="ratioX" :size="sizeWidth" :always="always" />
      <bar :move="moveY" :ratio="ratioY" :size="sizeHeight" vertical :always="always" />
    </template>
  </div>
</template>

<script lang="ts">
import { addUnit, isNumber } from '@fzui/utils';
import { FZ_SCROLLBAR_INJECT_KEY } from '@fzui/utils/constants';
import { debugWarn } from '@fzui/utils/error';
import { useEventListener, useResizeObserver } from '@vueuse/core';
import { computed, CSSProperties, defineComponent, nextTick, onMounted, provide, reactive, ref, StyleValue, watch } from 'vue';
import { scrollbarEmits, scrollbarProps } from './Scrollbar';

import Bar from './SideBar.vue';

export default defineComponent({
  name: 'FzScrollbar',
  components: { Bar },
  props: scrollbarProps,
  emits: scrollbarEmits,
  setup(props, { emit }) {
    let stopResizeObserver: (() => void) | undefined;
    let stopResizeListener: (() => void) | undefined;

    const scrollbarRef = ref<HTMLDivElement>();
    const wrapRef = ref<HTMLDivElement>();
    const resizeRef = ref<HTMLElement>();

    const sizeWidth = ref('0');
    const sizeHeight = ref('0');
    const moveX = ref(0);
    const moveY = ref(0);
    const ratioY = ref(1);
    const ratioX = ref(1);
    const GAP = 4; // top 2 + bottom 2 of bar instance

    const style = computed<StyleValue>(() => {
      const style: CSSProperties = {};
      if (props.height) {
        style.height = addUnit(props.height);
      }
      if (props.maxHeight) {
        style.maxHeight = addUnit(props.maxHeight);
      }
      return [props.wrapStyle, style];
    });

    const handleScroll = () => {
      if (wrapRef.value) {
        const offsetHeight = wrapRef.value.offsetHeight - GAP;
        const offsetWidth = wrapRef.value.offsetWidth - GAP;

        moveY.value = ((wrapRef.value.scrollTop * 100) / offsetHeight) * ratioY.value;
        moveX.value = ((wrapRef.value.scrollLeft * 100) / offsetWidth) * ratioX.value;

        emit('scroll', {
          scrollTop: wrapRef.value.scrollTop,
          scrollLeft: wrapRef.value.scrollLeft,
        });
      }
    };

    const setScrollTop = (value: number) => {
      if (!isNumber(value)) {
        debugWarn('FzScrollbar', 'value must be a number');
        return;
      }
      wrapRef.value!.scrollTop = value;
    };

    const setScrollLeft = (value: number) => {
      if (!isNumber(value)) {
        debugWarn('FzScrollbar', 'value must be a number');
        return;
      }
      wrapRef.value!.scrollLeft = value;
    };

    const update = () => {
      if (!wrapRef.value) {
        return;
      }

      const offsetHeight = wrapRef.value.offsetHeight - GAP;
      const offsetWidth = wrapRef.value.offsetWidth - GAP;

      const originalHeight = offsetHeight ** 2 / wrapRef.value.scrollHeight;
      const originalWidth = offsetWidth ** 2 / wrapRef.value.scrollWidth;
      const height = Math.max(originalHeight, props.minSize);
      const width = Math.max(originalWidth, props.minSize);

      ratioY.value = originalHeight / (offsetHeight - originalHeight) / (height / (offsetHeight - height));
      ratioX.value = originalWidth / (offsetWidth - originalWidth) / (width / (offsetWidth - width));

      sizeHeight.value = height + GAP < offsetHeight ? `${height}px` : '';
      sizeWidth.value = width + GAP < offsetWidth ? `${width}px` : '';
    };

    watch(
      () => props.noresize,
      (noresize) => {
        if (noresize) {
          stopResizeObserver?.();
          stopResizeListener?.();
        } else {
          ({ stop: stopResizeObserver } = useResizeObserver(resizeRef, update));
          stopResizeListener = useEventListener('resize', update);
        }
      },
      { immediate: true },
    );

    provide(
      FZ_SCROLLBAR_INJECT_KEY,
      reactive({
        scrollbarElement: scrollbarRef,
        wrapElement: wrapRef,
      }),
    );

    onMounted(() => {
      if (!props.native) {
        nextTick(() => update());
      }
    });

    return {
      scrollbarRef,
      wrapRef,
      resizeRef,

      moveX,
      moveY,
      ratioX,
      ratioY,
      sizeWidth,
      sizeHeight,
      style,
      update,
      handleScroll,
      setScrollTop,
      setScrollLeft,
    };
  },
});
</script>
