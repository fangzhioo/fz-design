<script lang="ts" setup>
  import { inject, onBeforeUnmount, onMounted, provide, ref, unref, watch } from 'vue'
  import { FzFocusTrap } from '../../../focus-trap'
  import { FZ_POPPER_CONTENT_INJECT_KEY } from '../../../../constants'
  import { popperContentEmits, popperContentProps } from './content'
  import {
    usePopperContent,
    usePopperContentDOM,
    usePopperContentFocusTrap
  } from '../hooks'

  import type { WatchStopHandle } from 'vue'
  import { FZ_FORM_ITEM_INJECT_KEY } from '../../../../constants'
  import { NOOP, isElement, isNil } from '../../../../utils'

  defineOptions({
    name: 'FzPopperContent'
  })

  const emit = defineEmits(popperContentEmits)

  const props = defineProps(popperContentProps)

  const {
    focusStartRef,
    trapped,
    onFocusAfterReleased,
    onFocusAfterTrapped,
    onFocusInTrap,
    onFocusoutPrevented,
    onReleaseRequested
  } = usePopperContentFocusTrap(props, emit)

  const { attributes, arrowRef, contentRef, styles, instanceRef, role, update } =
    usePopperContent(props)

  const {
    ariaModal,
    arrowStyle,
    contentAttrs,
    contentClass,
    contentStyle,
    updateZIndex
  } = usePopperContentDOM(props, {
    styles,
    attributes,
    role
  })

  const formItemContext = inject<any>(FZ_FORM_ITEM_INJECT_KEY, undefined)
  const arrowOffset = ref<number>()

  provide(FZ_POPPER_CONTENT_INJECT_KEY, {
    arrowStyle,
    arrowRef,
    arrowOffset
  })

  if (formItemContext && (formItemContext.addInputId || formItemContext.removeInputId)) {
    // disallow auto-id from inside popper content
    provide(FZ_FORM_ITEM_INJECT_KEY, {
      ...formItemContext,
      addInputId: NOOP,
      removeInputId: NOOP
    })
  }

  let triggerTargetAriaStopWatch: WatchStopHandle | undefined = undefined

  const updatePopper = (shouldUpdateZIndex = true): void => {
    update()
    shouldUpdateZIndex && updateZIndex()
  }

  const togglePopperAlive = (): void => {
    updatePopper(false)
    if (props.visible && props.focusOnShow) {
      trapped.value = true
    } else if (props.visible === false) {
      trapped.value = false
    }
  }

  onMounted(() => {
    watch(
      () => props.triggerTargetEl,
      (triggerTargetEl, prevTriggerTargetEl) => {
        triggerTargetAriaStopWatch?.()
        triggerTargetAriaStopWatch = undefined

        const el = unref(triggerTargetEl || contentRef.value)
        const prevEl = unref(prevTriggerTargetEl || contentRef.value)

        if (isElement(el)) {
          triggerTargetAriaStopWatch = watch(
            [
              role,
              (): string | undefined => props.ariaLabel,
              ariaModal,
              (): string | undefined => props.id
            ],
            watches => {
              ['role', 'aria-label', 'aria-modal', 'id'].forEach((key, idx) => {
                isNil(watches[idx])
                  ? el.removeAttribute(key)
                  : // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    el.setAttribute(key, watches[idx]!)
              })
            },
            { immediate: true }
          )
        }
        if (prevEl !== el && isElement(prevEl)) {
          ['role', 'aria-label', 'aria-modal', 'id'].forEach(key => {
            prevEl.removeAttribute(key)
          })
        }
      },
      { immediate: true }
    )

    watch(() => props.visible, togglePopperAlive, { immediate: true })
  })

  onBeforeUnmount(() => {
    triggerTargetAriaStopWatch?.()
    triggerTargetAriaStopWatch = undefined
  })

  defineExpose({
    /**
     * @description popper content element
     */
    popperContentRef: contentRef,
    /**
     * @description popperjs instance
     */
    popperInstanceRef: instanceRef,
    /**
     * @description method for updating popper
     */
    updatePopper,

    /**
     * @description content style
     */
    contentStyle
  })
</script>

<template>
  <div
    ref="contentRef"
    v-bind="contentAttrs"
    :style="contentStyle"
    :class="contentClass"
    tabindex="-1"
    @mouseenter="e => $emit('mouseenter', e)"
    @mouseleave="e => $emit('mouseleave', e)"
  >
    <fz-focus-trap
      :trapped="trapped"
      trap-on-focus-in
      :focus-trap-el="contentRef"
      :focus-start-el="focusStartRef"
      @focus-after-trapped="onFocusAfterTrapped"
      @focus-after-released="onFocusAfterReleased"
      @focusin="onFocusInTrap"
      @focusout-prevented="onFocusoutPrevented"
      @release-requested="onReleaseRequested"
    >
      <slot />
    </fz-focus-trap>
  </div>
</template>
