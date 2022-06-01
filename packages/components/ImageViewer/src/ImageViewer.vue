<template>
  <teleport to="body" :disabled="!teleported">
    <transition name="viewer-fade" appear>
      <div ref="wrapper" :tabindex="-1" class="fz-image-viewer__wrapper" :style="{ zIndex: computedZIndex }">
        <div class="fz-image-viewer__mask" @click.self="hideOnClickModal && hide()" />

        <!-- CLOSE -->
        <span class="fz-image-viewer__btn fz-image-viewer__close" @click="hide">
          <fz-icon name="close" />
        </span>

        <!-- ARROW -->
        <template v-if="!isSingle">
          <span
            :class="[
              'fz-image-viewer__btn',
              'fz-image-viewer__prev',
              {
                'is-disabled': !infinite && isFirst,
              },
            ]"
            @click="prev"
          >
            <fz-icon name="arrow-left-bold" />
          </span>
          <span
            :class="[
              'fz-image-viewer__btn',
              'fz-image-viewer__next',
              {
                'is-disabled': !infinite && isLast,
              },
            ]"
            @click="next"
          >
            <fz-icon name="arrow-right-bold" />
          </span>
        </template>
        <!-- ACTIONS -->
        <div class="fz-image-viewer__btn fz-image-viewer__actions">
          <div class="fz-image-viewer__actions__inner">
            <fz-icon name="zoom-out" @click="handleActions('zoomOut')" />
            <fz-icon name="zoom-in" @click="handleActions('zoomIn')" />
            <i class="fz-image-viewer__actions__divider" />
            <fz-icon :name="mode.icon" @click="toggleMode" />
            <i class="fz-image-viewer__actions__divider" />
            <fz-icon name="back" @click="handleActions('anticlockwise')" />
            <fz-icon name="forward" @click="handleActions('clockwise')" />
          </div>
        </div>
        <!-- CANVAS -->
        <div class="fz-image-viewer__canvas">
          <img
            v-for="(url, i) in urlList"
            v-show="i === index"
            :ref="(el) => setImageRefs(el, i)"
            :key="url"
            :src="url"
            :style="imgStyle"
            class="fz-image-viewer__img"
            @load="handleImgLoad"
            @error="handleImgError"
            @mousedown="handleMouseDown"
          />
        </div>
        <slot />
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts">
import { EVENT_CODE } from '@fzui/constants';
import { useLocale, useZIndex } from '@fzui/hooks';
import { isFirefox, isNumber, keysOf, throttle } from '@fzui/utils';
import { useEventListener } from '@vueuse/core';
import { computed, CSSProperties, defineComponent, effectScope, nextTick, onMounted, ref, shallowRef, watch } from 'vue';
import { ImageViewerAction, imageViewerEmits, ImageViewerMode, imageViewerProps, ModesMenus } from './ImageViewer';

export default defineComponent({
  name: 'FzImageViewer',
  props: imageViewerProps,
  emits: imageViewerEmits,
  setup(props, { emit }) {
    const { t } = useLocale();

    const { nextZIndex } = useZIndex();
    const wrapper = ref<HTMLDivElement>();
    const imgRefs = ref<HTMLImageElement[]>([]);

    const scopeEventListener = effectScope();

    const loading = ref(true);
    const index = ref(props.initialIndex);
    const mode = shallowRef<ImageViewerMode>(ModesMenus.CONTAIN);
    const transform = ref({
      scale: 1,
      deg: 0,
      offsetX: 0,
      offsetY: 0,
      enableTransition: false,
    });

    const isSingle = computed(() => {
      const { urlList } = props;
      return urlList.length <= 1;
    });

    const isFirst = computed(() => {
      return index.value === 0;
    });

    const isLast = computed(() => {
      return index.value === props.urlList.length - 1;
    });

    const currentImg = computed(() => {
      return props.urlList[index.value];
    });

    const imgStyle = computed(() => {
      const { scale, deg, offsetX, offsetY, enableTransition } = transform.value;
      let translateX = offsetX / scale;
      let translateY = offsetY / scale;

      switch (deg % 360) {
        case 90:
        case -270:
          [translateX, translateY] = [translateY, -translateX];
          break;
        case 180:
        case -180:
          [translateX, translateY] = [-translateX, -translateY];
          break;
        case 270:
        case -90:
          [translateX, translateY] = [-translateY, translateX];
          break;
      }

      const style: CSSProperties = {
        transform: `scale(${scale}) rotate(${deg}deg) translate(${translateX}px, ${translateY}px)`,
        transition: enableTransition ? 'transform .3s' : '',
      };
      if (mode.value.name === ModesMenus.CONTAIN.name) {
        style.maxWidth = style.maxHeight = '100%';
      }
      return style;
    });

    const computedZIndex = computed(() => {
      return isNumber(props.zIndex) ? props.zIndex : nextZIndex();
    });

    const setImageRefs = (el: any, i: number) => (imgRefs.value[i] = el);

    function hide() {
      unregisterEventListener();
      emit('close');
    }

    function registerEventListener() {
      const keydownHandler = throttle((e: KeyboardEvent) => {
        switch (e.code) {
          // ESC
          case EVENT_CODE.esc:
            props.closeOnPressEscape && hide();
            break;
          // SPACE
          case EVENT_CODE.space:
            toggleMode();
            break;
          // LEFT_ARROW
          case EVENT_CODE.left:
            prev();
            break;
          // UP_ARROW
          case EVENT_CODE.up:
            handleActions('zoomIn');
            break;
          // RIGHT_ARROW
          case EVENT_CODE.right:
            next();
            break;
          // DOWN_ARROW
          case EVENT_CODE.down:
            handleActions('zoomOut');
            break;
        }
      });
      const mousewheelHandler = throttle((e: WheelEvent | any /* TODO: wheelDelta is deprecated */) => {
        const delta = e.wheelDelta ? e.wheelDelta : -e.detail;
        if (delta > 0) {
          handleActions('zoomIn', {
            zoomRate: 1.2,
            enableTransition: false,
          });
        } else {
          handleActions('zoomOut', {
            zoomRate: 1.2,
            enableTransition: false,
          });
        }
      });

      scopeEventListener.run(() => {
        useEventListener(document, 'keydown', keydownHandler);
        const mousewheelEventName = isFirefox() ? 'DOMMouseScroll' : 'mousewheel';
        useEventListener(document, mousewheelEventName, mousewheelHandler);
      });
    }

    function unregisterEventListener() {
      scopeEventListener.stop();
    }

    function handleImgLoad() {
      loading.value = false;
    }

    function handleImgError(e: Event) {
      loading.value = false;
      (e.target as HTMLImageElement).alt = t('el.image.error');
    }

    function handleMouseDown(e: MouseEvent) {
      if (loading.value || e.button !== 0 || !wrapper.value) return;
      transform.value.enableTransition = false;

      const { offsetX, offsetY } = transform.value;
      const startX = e.pageX;
      const startY = e.pageY;

      const dragHandler = throttle((ev: MouseEvent) => {
        transform.value = {
          ...transform.value,
          offsetX: offsetX + ev.pageX - startX,
          offsetY: offsetY + ev.pageY - startY,
        };
      });
      const removeMousemove = useEventListener(document, 'mousemove', dragHandler);
      useEventListener(document, 'mouseup', () => {
        removeMousemove();
      });

      e.preventDefault();
    }

    function reset() {
      transform.value = {
        scale: 1,
        deg: 0,
        offsetX: 0,
        offsetY: 0,
        enableTransition: false,
      };
    }

    function toggleMode() {
      if (loading.value) return;

      const modeNames = keysOf(ModesMenus);
      const modeValues = Object.values(ModesMenus);
      const currentMode = mode.value.name;
      const index = modeValues.findIndex((i) => i.name === currentMode);
      const nextIndex = (index + 1) % modeNames.length;
      mode.value = ModesMenus[modeNames[nextIndex]];
      reset();
    }

    function prev() {
      if (isFirst.value && !props.infinite) return;
      const len = props.urlList.length;
      index.value = (index.value - 1 + len) % len;
    }

    function next() {
      if (isLast.value && !props.infinite) return;
      const len = props.urlList.length;
      index.value = (index.value + 1) % len;
    }

    function handleActions(action: ImageViewerAction, options = {}) {
      if (loading.value) return;
      const { zoomRate, rotateDeg, enableTransition } = {
        zoomRate: 1.4,
        rotateDeg: 90,
        enableTransition: true,
        ...options,
      };
      switch (action) {
        case 'zoomOut':
          if (transform.value.scale > 0.2) {
            transform.value.scale = Number.parseFloat((transform.value.scale / zoomRate).toFixed(3));
          }
          break;
        case 'zoomIn':
          if (transform.value.scale < 7) {
            transform.value.scale = Number.parseFloat((transform.value.scale * zoomRate).toFixed(3));
          }
          break;
        case 'clockwise':
          transform.value.deg += rotateDeg;
          break;
        case 'anticlockwise':
          transform.value.deg -= rotateDeg;
          break;
      }
      transform.value.enableTransition = enableTransition;
    }

    watch(currentImg, () => {
      nextTick(() => {
        const $img = imgRefs.value[0];
        if (!$img?.complete) {
          loading.value = true;
        }
      });
    });

    watch(index, (val) => {
      reset();
      emit('switch', val);
    });

    onMounted(() => {
      registerEventListener();
      // add tabindex then wrapper can be focusable via Javascript
      // focus wrapper so arrow key can't cause inner scroll behavior underneath
      wrapper.value?.focus?.();
    });

    return {
      index,
      mode,
      imgStyle,
      imgRefs,
      computedZIndex,
      isSingle,
      isFirst,
      isLast,
      wrapper,

      hide,
      prev,
      next,
      handleActions,
      toggleMode,
      handleImgLoad,
      handleImgError,
      handleMouseDown,
      setImageRefs,
    };
  },
});
</script>
