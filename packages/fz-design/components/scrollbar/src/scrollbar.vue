<script lang="ts" setup>
import {
  computed,
  nextTick,
  onMounted,
  onUpdated,
  provide,
  reactive,
  ref,
  watch
} from 'vue'
import { useEventListener, useResizeObserver } from '@vueuse/core'
import { addUnit, warning, isNumber, isObject } from '../../../utils'
import { GAP } from './utils/util'
import type { ScrollbarContext} from './utils/constants';
import { scrollbarContextKey } from './utils/constants'
import Bar from './components/bar.vue'

import type { BarInstance } from './components/bar'
import type { CSSProperties, StyleValue } from 'vue'
import { Emits, Props } from './props'

const COMPONENT_NAME = 'FzScrollbar'

defineOptions({
  name: COMPONENT_NAME
})

const props = defineProps(Props)
const emit = defineEmits(Emits)

let stopResizeObserver: (() => void) | undefined = undefined
let stopResizeListener: (() => void) | undefined = undefined

const scrollbarRef = ref<HTMLDivElement>()
const wrapRef = ref<HTMLDivElement>()
const resizeRef = ref<HTMLElement>()

const sizeWidth = ref('0')
const sizeHeight = ref('0')
const barRef = ref<BarInstance>()
const ratioY = ref(1)
const ratioX = ref(1)

const wrapStyle = computed<StyleValue>(() => {
  const style: CSSProperties = {}
  if (props.height) style.height = addUnit(props.height)
  if (props.maxHeight) style.maxHeight = addUnit(props.maxHeight)
  return [props.wrapStyle, style]
})

const wrapKls = computed(() => {
  return [
    props.wrapClass,
    'fz-scrollbar__wrap',
    {
      'fz-scrollbar__wrap--hidden-default': !props.native
    }
  ]
})

const resizeKls = computed(() => {
  return ['fz-scrollbar__view', props.viewClass]
})

const handleScroll = (): void => {
  if (wrapRef.value) {
    barRef.value?.handleScroll(wrapRef.value)

    emit('scroll', {
      scrollTop: wrapRef.value.scrollTop,
      scrollLeft: wrapRef.value.scrollLeft
    })
  }
}

// TODO: refactor method overrides, due to script setup dts
function scrollTo(xCord: number, yCord?: number): void
// eslint-disable-next-line no-redeclare
function scrollTo(options: ScrollToOptions): void
// eslint-disable-next-line no-redeclare
function scrollTo (arg1: ScrollToOptions | number, arg2?: number): void {
  if (!wrapRef.value) return
  if (isObject(arg1)) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    wrapRef.value!.scrollTo(arg1)
  } else if (isNumber(arg1) && isNumber(arg2)) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    wrapRef.value!.scrollTo(arg1, arg2 as any)
  }
}

const setScrollTop = (value: number): void => {
  if (!isNumber(value)) {
    warning(COMPONENT_NAME, 'value must be a number')
    return
  }
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  wrapRef.value!.scrollTop = value
}

const setScrollLeft = (value: number): void => {
  if (!isNumber(value)) {
    warning(COMPONENT_NAME, 'value must be a number')
    return
  }
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  wrapRef.value!.scrollLeft = value
}

const update = (): void => {
  if (!wrapRef.value) return
  const offsetHeight = wrapRef.value.offsetHeight - GAP
  const offsetWidth = wrapRef.value.offsetWidth - GAP

  const originalHeight = offsetHeight ** 2 / wrapRef.value.scrollHeight
  const originalWidth = offsetWidth ** 2 / wrapRef.value.scrollWidth
  const height = Math.max(originalHeight, props.minSize)
  const width = Math.max(originalWidth, props.minSize)

  ratioY.value =
    originalHeight /
    (offsetHeight - originalHeight) /
    (height / (offsetHeight - height))
  ratioX.value =
    originalWidth /
    (offsetWidth - originalWidth) /
    (width / (offsetWidth - width))

  sizeHeight.value = height + GAP < offsetHeight ? `${height}px` : ''
  sizeWidth.value = width + GAP < offsetWidth ? `${width}px` : ''
}

watch(
  () => props.noresize,
  (noresize) => {
    if (noresize) {
      stopResizeObserver?.()
      stopResizeListener?.()
    } else {
      ({ stop: stopResizeObserver } = useResizeObserver(resizeRef as unknown as any, update))
      stopResizeListener = useEventListener('resize', update)
    }
  },
  { immediate: true }
)

watch(
  () => [props.maxHeight, props.height],
  () => {
    if (!props.native)
      nextTick(() => {
        update()
        if (wrapRef.value) {
          barRef.value?.handleScroll(wrapRef.value)
        }
      })
  }
)

provide(
  scrollbarContextKey,
  reactive({
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    scrollbarElement: scrollbarRef!,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    wrapElement: wrapRef!
  } as unknown as ScrollbarContext)
)

onMounted(() => {
  if (!props.native)
    nextTick(() => {
      update()
    })
})
onUpdated(() => update())

defineExpose({
  /** @description scrollbar wrap ref */
  wrapRef,
  /** @description update scrollbar state manually */
  update,
  /** @description scrolls to a particular set of coordinates */
  scrollTo,
  /** @description set distance to scroll top */
  setScrollTop,
  /** @description set distance to scroll left */
  setScrollLeft,
  /** @description handle scroll event */
  handleScroll
})
</script>
<template>
  <div ref="scrollbarRef" class="fz-scrollbar">
    <div
      ref="wrapRef"
      :class="wrapKls"
      :style="wrapStyle"
      @scroll="handleScroll"
    >
      <component
        :is="tag"
        :id="id"
        ref="resizeRef"
        :class="resizeKls"
        :style="viewStyle"
        :role="role"
        :aria-label="ariaLabel"
        :aria-orientation="ariaOrientation"
      >
        <slot />
      </component>
    </div>
    <template v-if="!native">
      <bar
        ref="barRef"
        :height="sizeHeight"
        :width="sizeWidth"
        :always="always"
        :ratio-x="ratioX"
        :ratio-y="ratioY"
      />
    </template>
  </div>
</template>
