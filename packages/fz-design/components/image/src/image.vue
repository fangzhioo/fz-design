<script lang="ts" setup>
import {
  computed,
  nextTick,
  onMounted,
  ref,
  useAttrs as useRawAttrs,
  watch
} from 'vue'
import { useEventListener, useThrottleFn } from '@vueuse/core'
import ImagePreview from '../../image-preview/src/image-preview.vue'
import { Emits, Props } from './props'
import type { CSSProperties, StyleValue } from 'vue'
import { useAttrs, useLocale, useNamespace } from '../../../hooks'
import { getScrollContainer, isClient, isElement, isInContainer, isString } from '../../../utils'

defineOptions({
  name: 'FzImage',
  inheritAttrs: false
})

const props = defineProps(Props)
const emit = defineEmits(Emits)

let prevOverflow = ''

const { t } = useLocale()
const ns = useNamespace('image')
const rawAttrs = useRawAttrs()
const attrs = useAttrs()

const imageSrc = ref<string | undefined>()
const hasLoadError = ref(false)
const isLoading = ref(true)
const showViewer = ref(false)
const container = ref<HTMLElement>()
const _scrollContainer = ref<HTMLElement | Window>()

const supportLoading = isClient && 'loading' in HTMLImageElement.prototype
let stopScrollListener: (() => void) | undefined
let stopWheelListener: (() => void) | undefined

const imageKls = computed(() => [
  ns.e('inner'),
  preview.value && ns.e('preview'),
  isLoading.value && ns.is('loading')
])

const containerStyle = computed(() => rawAttrs.style as StyleValue)

const imageStyle = computed<CSSProperties>(() => {
  const { fit } = props
  if (isClient && fit) {
    return { objectFit: fit }
  }
  return {}
})

const preview = computed(() => {
  const { previewSrcList } = props
  return Array.isArray(previewSrcList) && previewSrcList.length > 0
})

const imageIndex = computed(() => {
  const { previewSrcList, initialIndex } = props
  let previewIndex = initialIndex
  if (initialIndex > previewSrcList.length - 1) {
    previewIndex = 0
  }
  return previewIndex
})

const isManual = computed(() => {
  if (props.loading === 'eager') return false
  return (!supportLoading && props.loading === 'lazy') || props.lazy
})

const loadImage = (): void => {
  if (!isClient) return

  // reset status
  isLoading.value = true
  hasLoadError.value = false
  imageSrc.value = props.src
}

function handleLoad (event: Event): void {
  isLoading.value = false
  hasLoadError.value = false
  emit('load', event)
}

function handleError (event: Event): void {
  isLoading.value = false
  hasLoadError.value = true
  emit('error', event)
}

const handleLazyLoad = (): void => {
  if (isInContainer(container.value, _scrollContainer.value)) {
    loadImage()
    removeLazyLoadListener()
  }
}

const lazyLoadHandler = useThrottleFn(handleLazyLoad, 200, true)

const addLazyLoadListener = async (): Promise<void> => {
  if (!isClient) return

  await nextTick()

  const { scrollContainer } = props
  if (isElement(scrollContainer)) {
    _scrollContainer.value = scrollContainer
  } else if (isString(scrollContainer) && scrollContainer !== '') {
    _scrollContainer.value =
      document.querySelector<HTMLElement>(scrollContainer as string) ?? undefined
  } else if (container.value) {
    _scrollContainer.value = getScrollContainer(container.value)
  }

  if (_scrollContainer.value) {
    stopScrollListener = useEventListener(
      _scrollContainer.value,
      'scroll',
      lazyLoadHandler
    )
    setTimeout(() => handleLazyLoad(), 100)
  }
}

const removeLazyLoadListener = (): void => {
  if (!isClient || !_scrollContainer.value || !lazyLoadHandler) return

  stopScrollListener?.()
  _scrollContainer.value = undefined
}

const wheelHandler = (e: WheelEvent): boolean | undefined => {
  if (!e.ctrlKey) return

  if (e.deltaY < 0) {
    e.preventDefault()
    return false
  } else if (e.deltaY > 0) {
    e.preventDefault()
    return false
  }
}

const clickHandler = (): void => {
  // don't show viewer when preview is false
  if (!preview.value) return

  stopWheelListener = useEventListener('wheel', wheelHandler, {
    passive: false
  })

  // prevent body scroll
  prevOverflow = document.body.style.overflow
  document.body.style.overflow = 'hidden'
  showViewer.value = true
  emit('show')
}

const closeViewer = (): void => {
  stopWheelListener?.()
  document.body.style.overflow = prevOverflow
  showViewer.value = false
  emit('close')
}

const switchViewer = (val: number): void => {
  emit('switch', val)
}

watch(
  () => props.src,
  () => {
    if (isManual.value) {
      // reset status
      isLoading.value = true
      hasLoadError.value = false
      removeLazyLoadListener()
      addLazyLoadListener()
    } else {
      loadImage()
    }
  }
)

onMounted(() => {
  if (isManual.value) {
    addLazyLoadListener()
  } else {
    loadImage()
  }
})
</script>

<template>
  <div ref="container" :class="[ns.b(), $attrs.class]" :style="containerStyle">
    <slot v-if="hasLoadError" name="error">
      <div :class="ns.e('error')">{{ t('fz.image.error') }}</div>
    </slot>
    <template v-else>
      <img
        v-if="imageSrc !== undefined"
        v-bind="attrs"
        :src="imageSrc"
        :loading="loading"
        :style="imageStyle"
        :class="imageKls"
        @click="clickHandler"
        @load="handleLoad"
        @error="handleError"
      />
      <div v-if="isLoading" :class="ns.e('wrapper')">
        <slot name="placeholder">
          <div :class="ns.e('placeholder')" />
        </slot>
      </div>
    </template>
    <template v-if="preview">
      <image-preview
        v-if="showViewer"
        :z-index="zIndex"
        :initial-index="imageIndex"
        :infinite="infinite"
        :zoom-rate="zoomRate"
        :min-scale="minScale"
        :max-scale="maxScale"
        :url-list="previewSrcList"
        :hide-on-click-modal="hideOnClickModal"
        :teleported="previewTeleported"
        :close-on-press-escape="closeOnPressEscape"
        @close="closeViewer"
        @switch="switchViewer"
      >
        <div v-if="$slots.viewer">
          <slot name="viewer" />
        </div>
      </image-preview>
    </template>
  </div>
</template>
