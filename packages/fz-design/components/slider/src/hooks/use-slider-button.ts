import { computed, inject, nextTick, ref, watch } from 'vue'
import { EVENT_CODE, FZ_SLIDER_INJECT_KEY, UPDATE_MODEL_EVENT } from '../../../../constants'

import type { CSSProperties, ComputedRef, Ref, SetupContext } from 'vue'
import type { SliderProps } from '../props'
import type {
  SliderButtonEmits,
  SliderButtonInitData,
  SliderButtonProps
} from '../components/button'
import { debounce } from '../../../../utils'

const { left, down, right, up, home, end, pageUp, pageDown } = EVENT_CODE

const useTooltip = (
  props: SliderButtonProps,
  formatTooltip: Ref<SliderProps['formatTooltip']>,
  showTooltip: Ref<SliderProps['showTooltip']>
): any => {
  // TODO any is temporary, replace with `TooltipInstance` later
  const tooltip = ref<any>()

  const tooltipVisible = ref(false)

  const enableFormat = computed(() => {
    return formatTooltip.value instanceof Function
  })

  const formatValue = computed(() => {
    return (
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      (enableFormat.value && formatTooltip.value!(props.modelValue)) ||
      props.modelValue
    )
  })

  const displayTooltip = debounce(() => {
    showTooltip.value && (tooltipVisible.value = true)
  }, 50)

  const hideTooltip = debounce(() => {
    showTooltip.value && (tooltipVisible.value = false)
  }, 50)

  return {
    tooltip,
    tooltipVisible,
    formatValue,
    displayTooltip,
    hideTooltip
  }
}

export const useSliderButton = (
  props: SliderButtonProps,
  initData: SliderButtonInitData,
  emit: SetupContext<SliderButtonEmits>['emit']
): any => {
  const {
    disabled,
    min,
    max,
    step,
    showTooltip,
    precision,
    sliderSize,
    formatTooltip,
    emitChange,
    resetSize,
    updateDragging
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  } = inject(FZ_SLIDER_INJECT_KEY)!

  const { tooltip, tooltipVisible, formatValue, displayTooltip, hideTooltip } =
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    useTooltip(props, formatTooltip!, showTooltip)

  const button = ref<HTMLDivElement>()

  const currentPosition = computed(() => {
    return `${
      ((props.modelValue - min.value) / (max.value - min.value)) * 100
    }%`
  })

  const wrapperStyle: ComputedRef<CSSProperties> = computed(() => {
    return props.vertical
      ? { bottom: currentPosition.value }
      : { left: currentPosition.value }
  })

  const handleMouseEnter = (): void => {
    initData.hovering = true
    displayTooltip()
  }

  const handleMouseLeave = (): void => {
    initData.hovering = false
    if (!initData.dragging) {
      hideTooltip()
    }
  }

  const onButtonDown = (event: MouseEvent | TouchEvent): void => {
    if (disabled.value) return
    event.preventDefault()
    onDragStart(event)
    window.addEventListener('mousemove', onDragging)
    window.addEventListener('touchmove', onDragging)
    window.addEventListener('mouseup', onDragEnd)
    window.addEventListener('touchend', onDragEnd)
    window.addEventListener('contextmenu', onDragEnd)
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    button.value!.focus()
  }

  const incrementPosition = (amount: number): void => {
    if (disabled.value) return
    initData.newPosition =
      Number.parseFloat(currentPosition.value) +
      (amount / (max.value - min.value)) * 100
    setPosition(initData.newPosition)
    emitChange()
  }

  const onLeftKeyDown = (): void => {
    incrementPosition(-step.value)
  }

  const onRightKeyDown = (): void => {
    incrementPosition(step.value)
  }

  const onPageDownKeyDown = (): void => {
    incrementPosition(-step.value * 4)
  }

  const onPageUpKeyDown = (): void => {
    incrementPosition(step.value * 4)
  }

  const onHomeKeyDown = (): void => {
    if (disabled.value) return
    setPosition(0)
    emitChange()
  }

  const onEndKeyDown = (): void => {
    if (disabled.value) return
    setPosition(100)
    emitChange()
  }

  const onKeyDown = (event: KeyboardEvent): void => {
    let isPreventDefault = true
    if ([left, down].includes(event.key)) {
      onLeftKeyDown()
    } else if ([right, up].includes(event.key)) {
      onRightKeyDown()
    } else if (event.key === home) {
      onHomeKeyDown()
    } else if (event.key === end) {
      onEndKeyDown()
    } else if (event.key === pageDown) {
      onPageDownKeyDown()
    } else if (event.key === pageUp) {
      onPageUpKeyDown()
    } else {
      isPreventDefault = false
    }
    isPreventDefault && event.preventDefault()
  }

  const getClientXY = (event: MouseEvent | TouchEvent): { clientX: number, clientY: number } => {
    let clientX: number
    let clientY: number
    if (event.type.startsWith('touch')) {
      clientY = (event as TouchEvent).touches[0].clientY
      clientX = (event as TouchEvent).touches[0].clientX
    } else {
      clientY = (event as MouseEvent).clientY
      clientX = (event as MouseEvent).clientX
    }
    return {
      clientX,
      clientY
    }
  }

  const onDragStart = (event: MouseEvent | TouchEvent): void => {
    initData.dragging = true
    initData.isClick = true
    const { clientX, clientY } = getClientXY(event)
    if (props.vertical) {
      initData.startY = clientY
    } else {
      initData.startX = clientX
    }
    initData.startPosition = Number.parseFloat(currentPosition.value)
    initData.newPosition = initData.startPosition
  }

  const onDragging = (event: MouseEvent | TouchEvent): void => {
    if (initData.dragging) {
      initData.isClick = false
      displayTooltip()
      resetSize()
      let diff: number
      const { clientX, clientY } = getClientXY(event)
      if (props.vertical) {
        initData.currentY = clientY
        diff = ((initData.startY - initData.currentY) / sliderSize.value) * 100
      } else {
        initData.currentX = clientX
        diff = ((initData.currentX - initData.startX) / sliderSize.value) * 100
      }
      initData.newPosition = initData.startPosition + diff
      setPosition(initData.newPosition)
    }
  }

  const onDragEnd = (): void => {
    if (initData.dragging) {
      /*
       * 防止在 mouseup 后立即触发 click，导致滑块有几率产生一小段位移
       * 不使用 preventDefault 是因为 mouseup 和 click 没有注册在同一个 DOM 上
       */
      setTimeout(() => {
        initData.dragging = false
        if (!initData.hovering) {
          hideTooltip()
        }
        if (!initData.isClick) {
          setPosition(initData.newPosition)
        }
        emitChange()
      }, 0)
      window.removeEventListener('mousemove', onDragging)
      window.removeEventListener('touchmove', onDragging)
      window.removeEventListener('mouseup', onDragEnd)
      window.removeEventListener('touchend', onDragEnd)
      window.removeEventListener('contextmenu', onDragEnd)
    }
  }

  const setPosition = async (newPosition: number): Promise<void> => {
    if (newPosition === null || Number.isNaN(+newPosition)) return
    if (newPosition < 0) {
      newPosition = 0
    } else if (newPosition > 100) {
      newPosition = 100
    }
    const lengthPerStep = 100 / ((max.value - min.value) / step.value)
    const steps = Math.round(newPosition / lengthPerStep)
    let value =
      steps * lengthPerStep * (max.value - min.value) * 0.01 + min.value
    value = Number.parseFloat(value.toFixed(precision.value))

    if (value !== props.modelValue) {
      emit(UPDATE_MODEL_EVENT, value)
    }

    if (!initData.dragging && props.modelValue !== initData.oldValue) {
      initData.oldValue = props.modelValue
    }

    await nextTick()
    initData.dragging && displayTooltip()
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    tooltip.value!.updatePopper()
  }

  watch(
    () => initData.dragging,
    (val) => {
      updateDragging(val)
    }
  )

  return {
    disabled,
    button,
    tooltip,
    tooltipVisible,
    showTooltip,
    wrapperStyle,
    formatValue,
    handleMouseEnter,
    handleMouseLeave,
    onButtonDown,
    onKeyDown,
    setPosition
  }
}
