<script lang="ts" setup>
import { computed, inject, onBeforeUnmount, onMounted, ref, unref, watch } from 'vue'
import { onClickOutside } from '@vueuse/core'
import FzPopperContent from '../../../popper/src/components/content.vue';
import { TOOLTIP_INJECTION_KEY } from '../interface'
import { useTooltipContentProps } from './content'
import { useNamespace, usePopperContainerId } from '../../../../hooks';
import { composeEventHandlers } from '../../../../utils';

defineOptions({
  name: 'FzTooltipContent',
  inheritAttrs: false
})

const props = defineProps(useTooltipContentProps)

const { selector } = usePopperContainerId()
const ns = useNamespace('tooltip')
const contentRef = ref<any>(null)
const destroyed = ref(false)
const {
  controlled,
  id,
  open,
  trigger,
  onClose,
  onOpen,
  onShow,
  onHide,
  onBeforeShow,
  onBeforeHide
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
} = inject(TOOLTIP_INJECTION_KEY, undefined)!
const transitionClass = computed(() => {
  return props.transition || `${ns.namespace}-fade-in-linear`
})
const persistentRef = computed(() => {
  // For testing, we would always want the content to be rendered
  // to the DOM, so we need to return true here.
  if (process.env.NODE_ENV === 'test') {
    return true
  }
  return props.persistent
})

onBeforeUnmount(() => {
  destroyed.value = true
})

const shouldRender = computed(() => {
  return unref(persistentRef) ? true : unref(open)
})

const shouldShow = computed(() => {
  return props.disabled ? false : unref(open)
})

const appendTo = computed(() => {
  return props.appendTo || selector.value
})

const contentStyle = computed(() => (props.style ?? {}) as any)

const ariaHidden = computed(() => !unref(open))

const onTransitionLeave = (): void => {
  onHide()
}

const stopWhenControlled = (): boolean|undefined => {
  if (unref(controlled)) return true
}

const onContentEnter = composeEventHandlers(stopWhenControlled, () => {
  if (props.enterable && unref(trigger) === 'hover') {
    onOpen()
  }
})

const onContentLeave = composeEventHandlers(stopWhenControlled, () => {
  if (unref(trigger) === 'hover') {
    onClose()
  }
})

const onBeforeEnter = (): void => {
  contentRef.value?.updatePopper?.()
  onBeforeShow?.()
}

const onBeforeLeave = (): void => {
  onBeforeHide?.()
}

const onAfterShow = (): void => {
  onShow()
  stopHandle = onClickOutside(
    computed(() => contentRef.value?.popperContentRef) as any,
    () => {
      if (unref(controlled)) return
      const $trigger = unref(trigger)
      if ($trigger !== 'hover') {
        onClose()
      }
    }
  )
}

const onBlur = (): void => {
  if (!props.virtualTriggering) {
    onClose()
  }
}

let stopHandle: ReturnType<typeof onClickOutside>

watch(
  () => unref(open),
  (val) => {
    if (!val) {
      stopHandle?.()
    }
  },
  {
    flush: 'post'
  }
)

watch(
  () => props.content,
  () => {
    contentRef.value?.updatePopper?.()
  }
)

onMounted(() => {
  console.log('contentRef', contentRef.value);
})

defineExpose({
  /**
   * @description el-popper-content component instance
   */
  contentRef
})
</script>

<template>
  <teleport :disabled="!teleported" :to="appendTo">
    <transition
      :name="transitionClass"
      @after-leave="onTransitionLeave"
      @before-enter="onBeforeEnter"
      @after-enter="onAfterShow"
      @before-leave="onBeforeLeave"
    >
      <fz-popper-content
        v-if="shouldRender"
        v-show="shouldShow"
        :id="id"
        ref="contentRef"
        v-bind="$attrs"
        :aria-label="ariaLabel"
        :aria-hidden="ariaHidden"
        :boundaries-padding="boundariesPadding"
        :fallback-placements="fallbackPlacements"
        :gpu-acceleration="gpuAcceleration"
        :offset="offset"
        :placement="placement"
        :popper-options="popperOptions"
        :strategy="strategy"
        :effect="effect"
        :enterable="enterable"
        :pure="pure"
        :popper-class="popperClass"
        :popper-style="[popperStyle, contentStyle]"
        :reference-el="referenceEl"
        :trigger-target-el="triggerTargetEl"
        :visible="shouldShow"
        :z-index="zIndex"
        @mouseenter="onContentEnter"
        @mouseleave="onContentLeave"
        @blur="onBlur"
        @close="onClose"
      >
        <template v-if="!destroyed">
          <slot />
        </template>
      </fz-popper-content>
    </transition>
  </teleport>
</template>
