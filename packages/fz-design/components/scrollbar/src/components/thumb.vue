<script lang="ts" setup>
  import { computed, inject, onBeforeUnmount, onMounted, ref } from 'vue'
  import { isClient, off, on, throwError } from '../../../../utils'
  import { scrollbarContextKey } from '../utils/constants'
  import { BAR_MAP, renderThumbStyle } from '../utils/util'
  import { thumbProps } from './thumb'

  import type { ScrollbarContext} from '../utils/constants';

  const COMPONENT_NAME = 'Thumb'
  const props = defineProps(thumbProps)

  const scrollbar = inject<ScrollbarContext>(scrollbarContextKey)

  if (!scrollbar) throwError(COMPONENT_NAME, 'can not inject scrollbar context')

  const instance = ref<HTMLDivElement>()
  const thumb = ref<HTMLDivElement>()

  const thumbState = ref<Partial<Record<'X' | 'Y', number>>>({})
  const visible = ref(false)

  let cursorDown = false
  let cursorLeave = false
  let originalOnSelectStart: ((this: GlobalEventHandlers, ev: Event) => any) | null =
    isClient ? document.onselectstart : null

  const bar = computed(() => BAR_MAP[props.vertical ? 'vertical' : 'horizontal'])

  const thumbStyle = computed(() =>
    renderThumbStyle({
      size: props.size,
      move: props.move,
      bar: bar.value
    })
  )

  const offsetRatio = computed(
    () =>
      // offsetRatioX = original width of thumb / current width of thumb / ratioX
      // offsetRatioY = original height of thumb / current height of thumb / ratioY
      // instance height = wrap height - GAP
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      instance.value![bar.value.offset] ** 2 /
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      scrollbar!.wrapElement![bar.value.scrollSize] /
      props.ratio /
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      thumb.value![bar.value.offset]
  )

  const clickThumbHandler = (e: MouseEvent): void => {
    // prevent click event of middle and right button
    e.stopPropagation()
    if (e.ctrlKey || [1, 2].includes(e.button)) return

    window.getSelection()?.removeAllRanges()
    startDrag(e)

    const el = e.currentTarget as HTMLDivElement
    if (!el) return
    thumbState.value[bar.value.axis] =
      el[bar.value.offset] -
      (e[bar.value.client] - el.getBoundingClientRect()[bar.value.direction])
  }

  const clickTrackHandler = (e: MouseEvent): void => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    if (!thumb.value || !instance.value || !scrollbar!.wrapElement) return

    const offset = Math.abs(
      (e.target as HTMLElement).getBoundingClientRect()[bar.value.direction] -
        e[bar.value.client]
    )
    const thumbHalf = thumb.value[bar.value.offset] / 2
    const thumbPositionPercentage =
      ((offset - thumbHalf) * 100 * offsetRatio.value) / instance.value[bar.value.offset]

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    scrollbar!.wrapElement[bar.value.scroll] =
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      (thumbPositionPercentage * scrollbar!.wrapElement[bar.value.scrollSize]) / 100
  }

  const startDrag = (e: MouseEvent): void => {
    e.stopImmediatePropagation()
    cursorDown = true
    document.addEventListener('mousemove', mouseMoveDocumentHandler)
    document.addEventListener('mouseup', mouseUpDocumentHandler)
    originalOnSelectStart = document.onselectstart
    document.onselectstart = (): boolean => false
  }

  const mouseMoveDocumentHandler = (e: MouseEvent): void => {
    if (!instance.value || !thumb.value) return
    if (cursorDown === false) return

    const prevPage = thumbState.value[bar.value.axis]
    if (!prevPage) return

    const offset =
      (instance.value.getBoundingClientRect()[bar.value.direction] -
        e[bar.value.client]) *
      -1
    const thumbClickPosition = thumb.value[bar.value.offset] - prevPage
    const thumbPositionPercentage =
      ((offset - thumbClickPosition) * 100 * offsetRatio.value) /
      instance.value[bar.value.offset]
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    scrollbar!.wrapElement[bar.value.scroll] =
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      (thumbPositionPercentage * scrollbar!.wrapElement[bar.value.scrollSize]) / 100
  }

  const mouseUpDocumentHandler = (): void => {
    cursorDown = false
    thumbState.value[bar.value.axis] = 0
    document.removeEventListener('mousemove', mouseMoveDocumentHandler)
    document.removeEventListener('mouseup', mouseUpDocumentHandler)
    restoreOnselectstart()
    if (cursorLeave) visible.value = false
  }

  const mouseMoveScrollbarHandler = (): void => {
    cursorLeave = false
    visible.value = !!props.size
  }

  const mouseLeaveScrollbarHandler = (): void => {
    cursorLeave = true
    visible.value = cursorDown
  }

  onBeforeUnmount(() => {
    restoreOnselectstart()
    document.removeEventListener('mouseup', mouseUpDocumentHandler)
  })

  const restoreOnselectstart = (): void => {
    if (document.onselectstart !== originalOnSelectStart)
      document.onselectstart = originalOnSelectStart
  }

  onMounted(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    on(scrollbar!.scrollbarElement , 'mousemove', mouseMoveScrollbarHandler);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    on(scrollbar!.scrollbarElement, 'mouseleave', mouseLeaveScrollbarHandler);
  })

  onBeforeUnmount(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    off(scrollbar!.scrollbarElement, 'mousemove', mouseMoveScrollbarHandler);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    off(scrollbar!.scrollbarElement, 'mouseleave', mouseLeaveScrollbarHandler);
  })

  // useEventListener(
  //   toRef(scrollbar, 'scrollbarElement'),
  //   'mousemove',
  //   mouseMoveScrollbarHandler
  // )
  // useEventListener(
  //   toRef(scrollbar, 'scrollbarElement'),
  //   'mouseleave',
  //   mouseLeaveScrollbarHandler
  // )
</script>

<template>
  <transition name="fz-scrollbar-fade">
    <div
      v-show="always || visible"
      ref="instance"
      :class="['fz-scrollbar__bar', { [`is-${bar.key}`]:!!bar.key }]"
      @mousedown="clickTrackHandler"
    >
      <div
        ref="thumb"
        class="fz-scrollbar__thumb"
        :style="thumbStyle"
        @mousedown="clickThumbHandler"
      />
    </div>
  </transition>
</template>
