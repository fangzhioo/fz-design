<script lang="ts" setup>
  import {
    computed,
    effectScope,
    markRaw,
    nextTick,
    onMounted,
    ref,
    shallowRef,
    watch
  } from 'vue'
  import { useEventListener } from '@vueuse/core'

  // import {
  //   ArrowLeft,
  //   ArrowRight,
  //   Close,
  //   FullScreen,
  //   RefreshLeft,
  //   RefreshRight,
  //   ScaleToOriginal,
  //   ZoomIn,
  //   ZoomOut
  // } from '@element-plus/icons-vue'
  import { Emits, Props } from './props'
  import { EVENT_CODE } from '../../../constants'
  import { isNumber, throttle } from '../../../utils'
  import { useLocale, useNamespace, useZIndex } from '../../../hooks'
  import {
    IconMinimize,
    IconMaximize,
    IconX,
    IconZoomOut,
    IconZoomIn,
    IconChevronRight,
    IconChevronLeft,
    IconRotateCcw,
    IconRotateCw
  } from '@fz-design/fz-design-icon'

  import type { CSSProperties } from 'vue'
  import type { ImageViewerAction, ImageViewerMode } from './interface'

  const modes: Record<'CONTAIN' | 'ORIGINAL', ImageViewerMode> = {
    CONTAIN: {
      name: 'contain',
      icon: markRaw(IconMaximize)
    },
    ORIGINAL: {
      name: 'original',
      icon: markRaw(IconMinimize)
    }
  }

  defineOptions({
    name: 'FzImagePreview'
  })

  const props = defineProps(Props)
  const emit = defineEmits(Emits)

  const { t } = useLocale()
  const ns = useNamespace('image-preview')
  const { nextZIndex } = useZIndex()
  const wrapper = ref<HTMLDivElement>()
  const imgRefs = ref<HTMLImageElement[]>([])

  const scopeEventListener = effectScope()

  const loading = ref(true)
  const activeIndex = ref(props.initialIndex)
  const mode = shallowRef<ImageViewerMode>(modes.CONTAIN)
  const transform = ref({
    scale: 1,
    deg: 0,
    offsetX: 0,
    offsetY: 0,
    enableTransition: false
  })

  const isSingle = computed(() => {
    const { urlList } = props
    return urlList.length <= 1
  })

  const isFirst = computed(() => {
    return activeIndex.value === 0
  })

  const isLast = computed(() => {
    return activeIndex.value === props.urlList.length - 1
  })

  const currentImg = computed(() => {
    return props.urlList[activeIndex.value]
  })

  const arrowPrevKls = computed(() => [
    ns.e('btn'),
    ns.e('prev'),
    ns.is('disabled', !props.infinite && isFirst.value)
  ])

  const arrowNextKls = computed(() => [
    ns.e('btn'),
    ns.e('next'),
    ns.is('disabled', !props.infinite && isLast.value)
  ])

  const imgStyle = computed(() => {
    const { scale, deg, offsetX, offsetY, enableTransition } = transform.value
    let translateX = offsetX / scale
    let translateY = offsetY / scale

    switch (deg % 360) {
      case 90:
      case -270:
        [translateX, translateY] = [translateY, -translateX]
        break
      case 180:
      case -180:
        [translateX, translateY] = [-translateX, -translateY]
        break
      case 270:
      case -90:
        [translateX, translateY] = [-translateY, translateX]
        break
    }

    const style: CSSProperties = {
      transform: `scale(${scale}) rotate(${deg}deg) translate(${translateX}px, ${translateY}px)`,
      transition: enableTransition ? 'transform .3s' : ''
    }
    if (mode.value.name === modes.CONTAIN.name) {
      style.maxWidth = style.maxHeight = '100%'
    }
    return style
  })

  const computedZIndex = computed(() => {
    return isNumber(props.zIndex) ? props.zIndex : nextZIndex()
  })

  function hide (): void {
    unregisterEventListener()
    emit('close')
  }

  function registerEventListener (): void {
    const keydownHandler = throttle((e: KeyboardEvent) => {
      switch (e.code) {
        // ESC
        case EVENT_CODE.esc:
          props.closeOnPressEscape && hide()
          break
        // SPACE
        case EVENT_CODE.space:
          toggleMode()
          break
        // LEFT_ARROW
        case EVENT_CODE.left:
          prev()
          break
        // UP_ARROW
        case EVENT_CODE.up:
          handleActions('zoomIn')
          break
        // RIGHT_ARROW
        case EVENT_CODE.right:
          next()
          break
        // DOWN_ARROW
        case EVENT_CODE.down:
          handleActions('zoomOut')
          break
      }
    }, 0)
    const mousewheelHandler = throttle((e: WheelEvent) => {
      const delta = e.deltaY || e.deltaX
      handleActions(delta < 0 ? 'zoomIn' : 'zoomOut', {
        zoomRate: props.zoomRate,
        enableTransition: false
      })
    }, 0)

    scopeEventListener.run(() => {
      useEventListener(document, 'keydown', keydownHandler)
      useEventListener(document, 'wheel', mousewheelHandler)
    })
  }

  function unregisterEventListener (): void {
    scopeEventListener.stop()
  }

  function handleImgLoad (): void {
    loading.value = false
  }

  function handleImgError (e: Event): void {
    loading.value = false
    ;(e.target as HTMLImageElement).alt = t('fz.image.error')
  }

  function handleMouseDown (e: MouseEvent): void {
    if (loading.value || e.button !== 0 || !wrapper.value) return
    transform.value.enableTransition = false

    const { offsetX, offsetY } = transform.value
    const startX = e.pageX
    const startY = e.pageY

    const dragHandler = throttle((ev: MouseEvent) => {
      transform.value = {
        ...transform.value,
        offsetX: offsetX + ev.pageX - startX,
        offsetY: offsetY + ev.pageY - startY
      }
    }, 0)
    const removeMousemove = useEventListener(document, 'mousemove', dragHandler)
    useEventListener(document, 'mouseup', () => {
      removeMousemove()
    })

    e.preventDefault()
  }

  function reset (): void {
    transform.value = {
      scale: 1,
      deg: 0,
      offsetX: 0,
      offsetY: 0,
      enableTransition: false
    }
  }

  function toggleMode (): void {
    if (loading.value) return

    const modeNames = Object.keys(modes) as ('CONTAIN' | 'ORIGINAL')[]
    const modeValues = Object.values(modes)
    const currentMode = mode.value.name
    const index = modeValues.findIndex(i => i.name === currentMode)
    const nextIndex = (index + 1) % modeNames.length
    mode.value = modes[modeNames[nextIndex]]
    reset()
  }

  function setActiveItem (index: number): void {
    const len = props.urlList.length
    activeIndex.value = (index + len) % len
  }

  function prev (): void {
    if (isFirst.value && !props.infinite) return
    setActiveItem(activeIndex.value - 1)
  }

  function next (): void {
    if (isLast.value && !props.infinite) return
    setActiveItem(activeIndex.value + 1)
  }

  function handleActions (action: ImageViewerAction, options = {}): void {
    if (loading.value) return
    const { minScale, maxScale } = props
    const { zoomRate, rotateDeg, enableTransition } = {
      zoomRate: props.zoomRate,
      rotateDeg: 90,
      enableTransition: true,
      ...options
    }
    switch (action) {
      case 'zoomOut':
        if (transform.value.scale > minScale) {
          transform.value.scale = Number.parseFloat(
            (transform.value.scale / zoomRate).toFixed(3)
          )
        }
        break
      case 'zoomIn':
        if (transform.value.scale < maxScale) {
          transform.value.scale = Number.parseFloat(
            (transform.value.scale * zoomRate).toFixed(3)
          )
        }
        break
      case 'clockwise':
        transform.value.deg += rotateDeg
        emit('rotate', transform.value.deg)
        break
      case 'anticlockwise':
        transform.value.deg -= rotateDeg
        emit('rotate', transform.value.deg)
        break
    }
    transform.value.enableTransition = enableTransition
  }

  watch(currentImg, () => {
    nextTick(() => {
      const $img = imgRefs.value[0]
      if (!$img?.complete) {
        loading.value = true
      }
    })
  })

  watch(activeIndex, val => {
    reset()
    emit('switch', val)
  })

  onMounted(() => {
    registerEventListener()
    // add tabindex then wrapper can be focusable via Javascript
    // focus wrapper so arrow key can't cause inner scroll behavior underneath
    wrapper.value?.focus?.()
  })

  defineExpose({
    /**
     * @description manually switch image
     */
    setActiveItem
  })
</script>

<template>
  <teleport to="body" :disabled="!teleported">
    <transition name="viewer-fade" appear>
      <div
        ref="wrapper"
        :tabindex="-1"
        :class="ns.e('wrapper')"
        :style="{ zIndex: computedZIndex }"
      >
        <div :class="ns.e('mask')" @click.self="hideOnClickModal && hide()" />

        <!-- CLOSE -->
        <span :class="[ns.e('btn'), ns.e('close')]" @click="hide">
          <fz-svg-icon :icon="IconX" />
        </span>

        <!-- ARROW -->
        <template v-if="!isSingle">
          <span :class="arrowPrevKls" @click="prev">
            <fz-svg-icon :icon="IconChevronLeft" />
          </span>
          <span :class="arrowNextKls" @click="next">
            <fz-svg-icon :icon="IconChevronRight" />
          </span>
        </template>
        <!-- ACTIONS -->
        <div :class="[ns.e('btn'), ns.e('actions')]">
          <div :class="ns.e('actions__inner')">
            <fz-svg-icon :icon="IconZoomOut" @click="handleActions('zoomOut')" />
            <fz-svg-icon :icon="IconZoomIn" @click="handleActions('zoomIn')" />
            <i :class="ns.e('actions__divider')" />

            <fz-svg-icon :icon="mode.icon" @click="toggleMode" />

            <i :class="ns.e('actions__divider')" />
            <fz-svg-icon :icon="IconRotateCcw" @click="handleActions('anticlockwise')" />
            <fz-svg-icon :icon="IconRotateCw" @click="handleActions('clockwise')" />
          </div>
        </div>
        <!-- CANVAS -->
        <div :class="ns.e('canvas')">
          <img
            v-for="(url, i) in urlList"
            v-show="i === activeIndex"
            :ref="(el) => (imgRefs[i] = el as HTMLImageElement)"
            :key="url"
            :src="url"
            :style="imgStyle"
            :class="ns.e('img')"
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
