<template>
  <transition name="fz-scrollbar-fade">
    <div v-show="always || visible" ref="instance" :class="['fz-scrollbar__bar', 'is-' + bar.key]" @mousedown="clickTrackHandler">
      <div ref="thumb" class="fz-scrollbar__thumb" :style="thumbStyle" @mousedown="clickThumbHandler"></div>
    </div>
  </transition>
</template>

<script lang="ts">
import { computed, CSSProperties, defineComponent, inject, onBeforeUnmount, ref, toRef } from 'vue';
import { FZ_SCROLLBAR_INJECT_KEY } from '@fzui/constants';
import { throwError } from '@fzui/utils/error';
import { useEventListener } from '@vueuse/core';
import { barProps, BAR_MAP } from './SideBar';
import { ScrollbarContext } from './Scrollbar';

export const renderThumbStyle = ({ move, size, bar }: any): CSSProperties => ({
  [bar.size]: size,
  transform: `translate${bar.axis}(${move}%)`,
});

export default defineComponent({
  name: 'SideBar',
  props: barProps,
  setup(props) {
    const scrollbar = inject<ScrollbarContext>(FZ_SCROLLBAR_INJECT_KEY);
    if (!scrollbar) {
      throwError('Scrollbar SideBar', 'can not inject scrollbar context');
    }

    const instance = ref<HTMLDivElement>();
    const thumb = ref<HTMLDivElement>();

    const barStore = ref<any>({});
    const visible = ref(false);

    let cursorDown = false;
    let cursorLeave = false;
    let onselectstartStore: ((this: any, ev: Event) => any) | null = null;

    const bar = computed(() => BAR_MAP[props.vertical ? 'vertical' : 'horizontal']);

    const thumbStyle = computed(() =>
      renderThumbStyle({
        size: props.size,
        move: props.move,
        bar: bar.value,
      }),
    );

    const offsetRatio = computed(() => {
      // offsetRatioX = original width of thumb / current width of thumb / ratioX
      // offsetRatioY = original height of thumb / current height of thumb / ratioY
      // instance height = wrap height - GAP
      // instance.value[bar.value.offset] ** 2 / scrollbar.wrapElement[bar.value.scrollSize] / props.ratio / thumb.value[bar.value.offset]
      let ratio = 0;
      if (instance.value && thumb.value && props.ratio !== undefined) {
        const offsetValue = instance.value[bar.value.offset];
        const scrollbarSize = scrollbar.wrapElement[bar.value.scrollSize];
        const thumboffsetValue = thumb.value[bar.value.offset];
        ratio = offsetValue ** 2 / scrollbarSize / props.ratio / thumboffsetValue;
      }
      return ratio;
    });

    const mouseMoveDocumentHandler = (e: MouseEvent) => {
      if (!instance.value || !thumb.value) {
        return;
      }
      if (cursorDown === false) {
        return;
      }

      const prevPage = barStore.value[bar.value.axis];
      if (!prevPage) {
        return;
      }

      const offset = (instance.value.getBoundingClientRect()[bar.value.direction] - e[bar.value.client]) * -1;
      const thumbClickPosition = thumb.value[bar.value.offset] - prevPage;
      const thumbPositionPercentage = ((offset - thumbClickPosition) * 100 * offsetRatio.value) / instance.value[bar.value.offset];
      scrollbar.wrapElement[bar.value.scroll] = (thumbPositionPercentage * scrollbar.wrapElement[bar.value.scrollSize]) / 100;
    };

    const mouseUpDocumentHandler = () => {
      cursorDown = false;
      barStore.value[bar.value.axis] = 0;
      document.removeEventListener('mousemove', mouseMoveDocumentHandler);
      document.removeEventListener('mouseup', mouseUpDocumentHandler);
      document.onselectstart = onselectstartStore;
      if (cursorLeave) {
        visible.value = false;
      }
    };

    const mouseMoveScrollbarHandler = () => {
      cursorLeave = false;
      visible.value = Boolean(props.size);
    };

    const mouseLeaveScrollbarHandler = () => {
      cursorLeave = true;
      visible.value = cursorDown;
    };

    const startDrag = (e: MouseEvent) => {
      e.stopImmediatePropagation();
      cursorDown = true;
      document.addEventListener('mousemove', mouseMoveDocumentHandler);
      document.addEventListener('mouseup', mouseUpDocumentHandler);
      onselectstartStore = document.onselectstart;
      document.onselectstart = () => false;
    };

    const clickThumbHandler = (e: MouseEvent) => {
      // prevent click event of middle and right button
      e.stopPropagation();
      if (e.ctrlKey || [1, 2].includes(e.button)) {
        return;
      }

      window.getSelection()?.removeAllRanges();
      startDrag(e);

      const el = e.currentTarget as HTMLDivElement;
      if (!el) {
        return;
      }
      barStore.value[bar.value.axis] = el[bar.value.offset] - (e[bar.value.client] - el.getBoundingClientRect()[bar.value.direction]);
    };

    const clickTrackHandler = (e: MouseEvent) => {
      if (!thumb.value || !instance.value || !scrollbar.wrapElement) {
        return;
      }

      const offset = Math.abs((e.target as HTMLElement).getBoundingClientRect()[bar.value.direction] - e[bar.value.client]);
      const thumbHalf = thumb.value[bar.value.offset] / 2;
      const thumbPositionPercentage = ((offset - thumbHalf) * 100 * offsetRatio.value) / instance.value[bar.value.offset];

      scrollbar.wrapElement[bar.value.scroll] = (thumbPositionPercentage * scrollbar.wrapElement[bar.value.scrollSize]) / 100;
    };

    onBeforeUnmount(() => document.removeEventListener('mouseup', mouseUpDocumentHandler));

    useEventListener(toRef(scrollbar, 'scrollbarElement'), 'mousemove', mouseMoveScrollbarHandler);
    useEventListener(toRef(scrollbar, 'scrollbarElement'), 'mouseleave', mouseLeaveScrollbarHandler);

    return {
      instance,
      thumb,
      bar,
      thumbStyle,
      visible,
      clickTrackHandler,
      clickThumbHandler,
    };
  },
});
</script>
