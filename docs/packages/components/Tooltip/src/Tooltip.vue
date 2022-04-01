<template>
  <fz-popper ref="popperRef">
    <fz-tooltip-trigger :disabled="disabled" :trigger="trigger" :virtual-ref="virtualRef" :virtual-triggering="virtualTriggering">
      <slot v-if="$slots.default" />
    </fz-tooltip-trigger>
    <fz-tooltip-content
      :aria-label="ariaLabel"
      :boundaries-padding="boundariesPadding"
      :content="content"
      :disabled="disabled"
      :effect="effect"
      :enterable="enterable"
      :fallback-placements="fallbackPlacements"
      :hide-after="hideAfter"
      :gpu-acceleration="gpuAcceleration"
      :offset="offset"
      :persistent="persistent"
      :popper-class="popperClass"
      :popper-style="popperStyle"
      :placement="placement"
      :popper-options="popperOptions"
      :pure="pure"
      :raw-content="rawContent"
      :reference-el="referenceEl"
      :show-after="compatShowAfter"
      :strategy="strategy"
      :teleported="teleported"
      :transition="transition"
      :z-index="zIndex"
    >
      <slot name="content">
        <span v-if="rawContent" v-html="content"></span>
        <span v-else>{{ content }}</span>
      </slot>
      <fz-popper-arrow v-if="compatShowArrow" :arrow-offset="arrowOffset" />
    </fz-tooltip-content>
  </fz-popper>
</template>

<script lang="ts">
import { defineComponent, computed, ref, provide, toRef, readonly, unref } from 'vue';
import { FZ_TOOLTIP_INJECT_KEY } from '@fzui/constants';
import { debugWarn, isBoolean, isUndefined } from '@fzui/utils';
import { Popper, PopperArrow } from '@fzui/components/Popper';
import { usePopperContainer, useId, useDelayedToggle } from '@fzui/hooks';
import TooltipContent from './TooltipContent.vue';
import TooltipTrigger from './TooltipTrigger.vue';
import { tooltipProps, tooltipEmits, useTooltipModelToggle } from './Tooltip';

export default defineComponent({
  name: 'FzTooltip',
  components: {
    FzPopper: Popper,
    FzPopperArrow: PopperArrow,
    FzTooltipContent: TooltipContent,
    FzTooltipTrigger: TooltipTrigger,
  },
  props: tooltipProps,
  emits: tooltipEmits,
  setup(props, { emit }) {
    usePopperContainer();
    const compatShowAfter = computed(() => {
      if (!isUndefined(props.openDelay)) {
        debugWarn('FzTooltip', 'open-delay is about to be deprecated in the next major version, please use `show-after` instead');
      }
      return props.openDelay || (props.showAfter as number);
    });
    const compatShowArrow = computed(() => {
      if (!isUndefined(props.visibleArrow)) {
        debugWarn('FzTooltip', '`visible-arrow` is about to be deprecated in the next major version, please use `show-arrow` instead');
      }
      return isBoolean(props.visibleArrow) ? props.visibleArrow : props.showArrow;
    });

    const id = useId();
    const popperRef = ref<InstanceType<typeof Popper> | null>(null);

    const updatePopper = () => {
      const popperComponent = unref(popperRef) as any;
      if (popperComponent) {
        popperComponent.popperInstanceRef?.update();
      }
    };
    const open = ref(false);

    const { show, hide } = useTooltipModelToggle({
      indicator: open,
    });

    const { onOpen, onClose } = useDelayedToggle({
      showAfter: compatShowAfter,
      hideAfter: toRef(props, 'hideAfter'),
      open: show,
      close: hide,
    });

    const controlled = computed(() => isBoolean(props.visible));

    provide(FZ_TOOLTIP_INJECT_KEY, {
      controlled,
      id,
      open: readonly(open),
      trigger: toRef(props, 'trigger'),
      onOpen,
      onClose,
      onToggle: () => {
        if (unref(open)) {
          onClose();
        } else {
          onOpen();
        }
      },
      onShow: () => {
        emit('show');
      },
      onHide: () => {
        emit('hide');
      },
      onBeforeShow: () => {
        emit('before-show');
      },
      onBeforeHide: () => {
        emit('before-hide');
      },
      updatePopper,
    });

    return {
      compatShowAfter,
      compatShowArrow,
      popperRef,
      open,
      hide,
      updatePopper,
      onOpen,
      onClose,
    };
  },
});
</script>
