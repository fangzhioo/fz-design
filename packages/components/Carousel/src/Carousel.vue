<template>
  <div ref="root" :class="carouselClasses" @mouseenter.stop="handleMouseEnter" @mouseleave.stop="handleMouseLeave">
    <div class="fz-carousel__container" :style="{ height: height }">
      <transition v-if="arrowDisplay" name="carousel-arrow-left">
        <button
          v-show="(arrow === 'always' || data.hover) && (props.loop || data.activeIndex > 0)"
          type="button"
          class="fz-carousel__arrow fz-carousel__arrow--left"
          @mouseenter="handleButtonEnter('left')"
          @mouseleave="handleButtonLeave"
          @click.stop="throttledArrowClick(data.activeIndex - 1)"
        >
          <fz-icon name="arrow-left-bold" />
        </button>
      </transition>
      <transition v-if="arrowDisplay" name="carousel-arrow-right">
        <button
          v-show="(arrow === 'always' || data.hover) && (props.loop || data.activeIndex < items.length - 1)"
          type="button"
          class="fz-carousel__arrow fz-carousel__arrow--right"
          @mouseenter="handleButtonEnter('right')"
          @mouseleave="handleButtonLeave"
          @click.stop="throttledArrowClick(data.activeIndex + 1)"
        >
          <fz-icon name="arrow-right-bold" />
        </button>
      </transition>
      <slot></slot>
    </div>
    <ul v-if="indicatorPosition !== 'none'" :class="indicatorsClasses">
      <li
        v-for="(item, index) in items"
        :key="index"
        :class="['fz-carousel__indicator', 'fz-carousel__indicator--' + direction, { 'is-active': index === data.activeIndex }]"
        @mouseenter="throttledIndicatorHover(index)"
        @click.stop="handleIndicatorClick(index)"
      >
        <button class="fz-carousel__button">
          <span v-if="hasLabel">{{ item.label }}</span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { FZ_CAROUSEL_INJECT_KEY } from '@fzui/constants';
import { debugWarn } from '@fzui/utils/error';
import { useEventListener } from '@vueuse/core';
import { throttle } from '@fzui/utils/lodash';
import { computed, defineComponent, nextTick, onBeforeUnmount, onMounted, provide, reactive, ref, watch } from 'vue';
import { carouselProps } from './Carousel';

interface CarouselState {
  activeIndex: number;
  containerWidth: number;
  timer: null | ReturnType<typeof setInterval>;
  hover: boolean;
}

export default defineComponent({
  name: 'FzCarousel',
  props: carouselProps,
  setup(props, { emit }) {
    // data
    const data = reactive<CarouselState>({
      activeIndex: -1,
      containerWidth: 0,
      timer: null,
      hover: false,
    });

    // refs
    const root = ref<HTMLElement>();
    const items = ref<Array<any>>([]);

    // computed
    const arrowDisplay = computed(() => props.arrow !== 'never' && props.direction !== 'vertical');

    const hasLabel = computed(() => {
      return items.value.some((item) => item.label.toString().length > 0);
    });

    const carouselClasses = computed(() => {
      const classes = ['fz-carousel', `fz-carousel--${props.direction}`];
      if (props.type === 'card') {
        classes.push('fz-carousel--card');
      }
      return classes;
    });

    const indicatorsClasses = computed(() => {
      const classes = ['fz-carousel__indicators', `fz-carousel__indicators--${props.direction}`];
      if (hasLabel.value) {
        classes.push('fz-carousel__indicators--labels');
      }
      if (props.indicatorPosition === 'outside' || props.type === 'card') {
        classes.push('fz-carousel__indicators--outside');
      }
      return classes;
    });

    // methods
    const resetItemPosition = (oldIndex: number) => {
      items.value.forEach((item, index) => {
        item.translateItem(index, data.activeIndex, oldIndex);
      });
    };

    const setActiveItem = (idx: string | number) => {
      let index = idx;
      if (typeof index === 'string') {
        const filteredItems = items.value.filter((item) => item.name === index);
        if (filteredItems.length > 0) {
          index = items.value.indexOf(filteredItems[0]);
        }
      }
      index = Number(index);
      if (isNaN(index) || index !== Math.floor(index)) {
        debugWarn('Carousel', 'index must be an integer.');
        return;
      }
      const length = items.value.length;
      const oldIndex = data.activeIndex;
      if (index < 0) {
        data.activeIndex = props.loop ? length - 1 : 0;
      } else if (index >= length) {
        data.activeIndex = props.loop ? 0 : length - 1;
      } else {
        data.activeIndex = index;
      }
      if (oldIndex === data.activeIndex) {
        resetItemPosition(oldIndex);
      }
    };

    const handleIndicatorClick = (index: number) => {
      data.activeIndex = index;
    };

    const handleIndicatorHover = (index: number) => {
      if (props.trigger === 'hover' && index !== data.activeIndex) {
        data.activeIndex = index;
      }
    };

    const prev = () => {
      setActiveItem(data.activeIndex - 1);
    };

    const next = () => {
      setActiveItem(data.activeIndex + 1);
    };

    const throttledArrowClick = throttle(
      (index) => {
        setActiveItem(index);
      },
      300,
      { trailing: true },
    );

    const throttledIndicatorHover = throttle((index) => {
      handleIndicatorHover(index);
    }, 300);

    const pauseTimer = () => {
      if (data.timer) {
        clearInterval(data.timer);
        data.timer = null;
      }
    };

    const playSlides = () => {
      if (data.activeIndex < items.value.length - 1) {
        data.activeIndex = data.activeIndex + 1;
      } else if (props.loop) {
        data.activeIndex = 0;
      }
    };

    const startTimer = () => {
      if (props.interval <= 0 || !props.autoplay || data.timer) {
        return;
      }
      data.timer = setInterval(() => playSlides(), props.interval);
    };

    const addItem = (item: any) => {
      items.value.push(item);
    };

    const removeItem = (uid: number) => {
      const index = items.value.findIndex((item) => item.uid === uid);
      if (index !== -1) {
        items.value.splice(index, 1);
        if (data.activeIndex === index) {
          next();
        }
      }
    };

    const itemInStage = (item: any, index: number) => {
      const length = items.value.length;
      const l1 = index === length - 1 && item.inStage && items.value[0].active;
      const l2 = item.inStage && items.value[index + 1] && items.value[index + 1].active;

      if (l1 || l2) {
        return 'left';
      }
      const r1 = index === 0 && item.inStage && items.value[length - 1].active;
      const r2 = item.inStage && items.value[index - 1] && items.value[index - 1].active;

      if (r1 || r2) {
        return 'right';
      }
      return false;
    };

    function handleMouseEnter() {
      data.hover = true;
      if (props.pauseOnHover) {
        pauseTimer();
      }
    }

    function handleMouseLeave() {
      data.hover = false;
      startTimer();
    }

    function handleButtonEnter(arrow: boolean | string) {
      if (props.direction === 'vertical') {
        return;
      }
      items.value.forEach((item, index) => {
        if (arrow === itemInStage(item, index)) {
          item.hover = true;
        }
      });
    }

    const handleButtonLeave = () => {
      if (props.direction === 'vertical') {
        return;
      }
      items.value.forEach((item) => {
        item.hover = false;
      });
    };

    // watch
    watch(
      () => data.activeIndex,
      (current, prev) => {
        resetItemPosition(prev);
        if (prev > -1) {
          emit('change', current, prev);
        }
      },
    );
    watch(
      () => props.autoplay,
      (current) => {
        if (current) {
          startTimer();
        } else {
          pauseTimer();
        }
      },
    );
    watch(
      () => props.loop,
      () => {
        setActiveItem(data.activeIndex);
      },
    );

    // lifecycle
    onMounted(() => {
      nextTick(() => {
        useEventListener(root.value, 'resize', resetItemPosition);
        if (props.initialIndex < items.value.length && props.initialIndex >= 0) {
          data.activeIndex = props.initialIndex;
        }
        startTimer();
      });
    });

    onBeforeUnmount(() => {
      pauseTimer();
    });

    // provide
    provide(FZ_CAROUSEL_INJECT_KEY, {
      root,
      direction: props.direction,
      type: props.type,
      items,
      loop: props.loop,
      addItem,
      removeItem,
      setActiveItem,
    });

    return {
      data,
      props,
      items,

      arrowDisplay,
      carouselClasses,
      indicatorsClasses,
      hasLabel,

      handleMouseEnter,
      handleMouseLeave,
      handleIndicatorClick,
      throttledArrowClick,
      throttledIndicatorHover,
      handleButtonEnter,
      handleButtonLeave,

      prev,
      next,
      setActiveItem,

      root,
    };
  },
});
</script>
