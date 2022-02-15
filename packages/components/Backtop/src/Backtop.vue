<template>
  <transition name="fz-fade-in">
    <div
      v-if="visible"
      :style="{
        right: styleRight,
        bottom: styleBottom,
      }"
      class="fz-backtop"
      @click.stop="handleClick"
    >
      <slot>
        <fz-icon name="top-filling" class="fz-backtop__icon"></fz-icon>
      </slot>
    </div>
  </transition>
</template>

<script lang="ts">
import { useEventListener, useThrottleFn } from '@vueuse/core';
import { computed, defineComponent, onMounted, ref, shallowRef } from 'vue';
import { easeInOutCubic, throwError } from '@fzui/utils';
import { backtopEmits, backtopProps } from './Backtop';

import { Icon } from '@fzui/components/Icon';

export default defineComponent({
  name: 'FzBacktop',
  components: {
    FzIcon: Icon,
  },
  props: backtopProps,
  emits: backtopEmits,

  setup(props, { emit }) {
    const el = shallowRef<HTMLElement | undefined>(document.documentElement);
    const container = shallowRef<Document | HTMLElement>(document);
    const visible = ref(false);
    const styleBottom = computed(() => `${props.bottom}px`);
    const styleRight = computed(() => `${props.right}px`);

    const scrollToTop = () => {
      if (!el.value) {
        return;
      }
      const beginTime = Date.now();
      const beginValue = el.value.scrollTop;
      const frameFunc = () => {
        if (!el.value) {
          return;
        }
        const progress = (Date.now() - beginTime) / 500;
        if (progress < 1) {
          el.value.scrollTop = beginValue * (1 - easeInOutCubic(progress));
          requestAnimationFrame(frameFunc);
        } else {
          el.value.scrollTop = 0;
        }
      };
      requestAnimationFrame(frameFunc);
    };
    const handleScroll = () => {
      if (el.value) {
        visible.value = el.value.scrollTop >= props.visibilityHeight;
      }
    };
    const handleClick = (event: MouseEvent) => {
      scrollToTop();
      emit('click', event);
    };

    const handleScrollThrottled = useThrottleFn(handleScroll, 300);

    onMounted(() => {
      if (props.target) {
        el.value = document.querySelector<HTMLElement>(props.target) ?? undefined;
        if (!el.value) {
          throwError('FzBacktop', `target is not existed: ${props.target}`);
        }
        container.value = el.value;
      }

      useEventListener(container, 'scroll', handleScrollThrottled);
    });

    return {
      visible,
      styleBottom,
      styleRight,
      handleClick,
    };
  },
});
</script>
