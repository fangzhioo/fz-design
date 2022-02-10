<template>
  <div
    v-show="data.ready"
    class="fz-carousel__item"
    :class="{
      'is-active': data.active,
      'fz-carousel__item--card': type === 'card',
      'is-in-stage': data.inStage,
      'is-hover': data.hover,
      'is-animating': data.animating,
    }"
    :style="itemStyle"
    @click="handleItemClick"
  >
    <div v-if="type === 'card'" v-show="!data.active" class="fz-carousel__mask"></div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { computed, CSSProperties, defineComponent, getCurrentInstance, inject, onMounted, onUnmounted, reactive, toRefs } from 'vue';
import { FZ_CAROUSEL_INJECT_KEY } from '@fzui/utils/constants';
import { debugWarn } from '@fzui/utils/error';
import { carouselItemProps } from './CarouselItem';

const CARD_SCALE = 0.83;

export default defineComponent({
  name: 'FzCarouselItem',
  props: carouselItemProps,
  setup(props) {
    // instance
    const instance = getCurrentInstance();

    // data
    const data = reactive({
      hover: false,
      translate: 0,
      scale: 1,
      active: false,
      ready: false,
      inStage: false,
      animating: false,
    });

    // inject
    const injectCarouselScope = inject<any>(FZ_CAROUSEL_INJECT_KEY, {});

    // computed
    const parentDirection = computed(() => {
      return injectCarouselScope.direction;
    });

    const itemStyle = computed(() => {
      const translateType = parentDirection.value === 'vertical' ? 'translateY' : 'translateX';
      const value = `${translateType}(${data.translate}px) scale(${data.scale})`;
      const style: CSSProperties = {
        transform: value,
      };
      return style;
    });

    // methods

    function processIndex(index: number, activeIndex: number, length: number) {
      if (activeIndex === 0 && index === length - 1) {
        return -1;
      } else if (activeIndex === length - 1 && index === 0) {
        return length;
      } else if (index < activeIndex - 1 && activeIndex - index >= length / 2) {
        return length + 1;
      } else if (index > activeIndex + 1 && index - activeIndex >= length / 2) {
        return -2;
      }
      return index;
    }

    function calcCardTranslate(index: number, activeIndex: number) {
      const parentWidth = injectCarouselScope.root.value?.offsetWidth || 0;
      if (data.inStage) {
        return (parentWidth * ((2 - CARD_SCALE) * (index - activeIndex) + 1)) / 4;
      } else if (index < activeIndex) {
        return (-(1 + CARD_SCALE) * parentWidth) / 4;
      }
      return ((3 + CARD_SCALE) * parentWidth) / 4;
    }

    function calcTranslate(index: number, activeIndex: number, isVertical: boolean) {
      const distance = (isVertical ? injectCarouselScope.root.value?.offsetHeight : injectCarouselScope.root.value?.offsetWidth) || 0;
      return distance * (index - activeIndex);
    }

    const translateItem = (idx: number, activeIndex: number, oldIndex: number) => {
      let index = idx;
      const parentType = injectCarouselScope.type;
      const length = injectCarouselScope.items.value.length;
      if (parentType !== 'card' && oldIndex !== undefined) {
        data.animating = index === activeIndex || index === oldIndex;
      }
      if (index !== activeIndex && length > 2 && injectCarouselScope.loop) {
        index = processIndex(index, activeIndex, length);
      }
      if (parentType === 'card') {
        if (parentDirection.value === 'vertical') {
          debugWarn('Carousel', 'vertical direction is not supported in card mode');
        }
        data.inStage = Math.round(Math.abs(index - activeIndex)) <= 1;
        data.active = index === activeIndex;
        data.translate = calcCardTranslate(index, activeIndex);
        data.scale = data.active ? 1 : CARD_SCALE;
      } else {
        data.active = index === activeIndex;
        const isVertical = parentDirection.value === 'vertical';
        data.translate = calcTranslate(index, activeIndex, isVertical);
      }
      data.ready = true;
    };

    function handleItemClick() {
      if (injectCarouselScope && injectCarouselScope.type === 'card' && instance) {
        const index = injectCarouselScope.items.value.findIndex((d: any) => d.uid === instance.uid);
        injectCarouselScope.setActiveItem(index);
      }
    }

    // lifecycle
    onMounted(() => {
      if (injectCarouselScope.addItem && instance) {
        injectCarouselScope.addItem({
          uid: instance.uid,
          ...props,
          ...toRefs(data),
          translateItem,
        });
      }
    });

    onUnmounted(() => {
      if (injectCarouselScope.removeItem && instance) {
        injectCarouselScope.removeItem(instance.uid);
      }
    });

    return {
      data,
      itemStyle,
      translateItem,
      type: injectCarouselScope.type,
      handleItemClick,
    };
  },
});
</script>
