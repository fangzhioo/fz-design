<template>
  <fz-popper-trigger
    :id="id"
    :virtual-ref="virtualRef"
    :open="open"
    :virtual-triggering="virtualTriggering"
    class="fz-tooptip-trigger"
    @blur="onBlur"
    @click="onClick"
    @contextmenu="onContextMenu"
    @focus="onFocus"
    @mouseenter="onMouseenter"
    @mouseleave="onMouseleave"
    @keydown="onKeydown"
  >
    <slot />
  </fz-popper-trigger>
</template>

<script lang="ts">
import { defineComponent, inject, ref, unref, toRef } from 'vue';
import { composeEventHandlers } from '@fzui/utils';
import { EVENT_CODE, FZ_TOOLTIP_INJECT_KEY } from '@fzui/constants';
import { PopperTrigger } from '@fzui/components/Popper';
import { OnlyChildExpose } from '@fzui/components/OnlyChild';
import { whenTrigger } from './utils';
import { tooltipTriggerProps } from './Tooltip';

export default defineComponent({
  name: 'ElTooltipTrigger',
  components: {
    FzPopperTrigger: PopperTrigger,
  },
  props: tooltipTriggerProps,
  setup(props) {
    const { controlled, id, open, onOpen, onClose, onToggle } = inject<any>(FZ_TOOLTIP_INJECT_KEY, undefined)!;
    const triggerRef = ref<OnlyChildExpose | null>(null);

    const stopWhenControlledOrDisabled = () => {
      if (unref(controlled) || props.disabled) {
        return true;
      }
    };
    const trigger = toRef(props, 'trigger');
    const onMouseenter = composeEventHandlers(stopWhenControlledOrDisabled, whenTrigger(trigger, 'hover', onOpen));
    const onMouseleave = composeEventHandlers(stopWhenControlledOrDisabled, whenTrigger(trigger, 'hover', onClose));
    const onClick = composeEventHandlers(
      stopWhenControlledOrDisabled,
      whenTrigger(trigger, 'click', (e) => {
        // distinguish left click
        if ((e as MouseEvent).button === 0) {
          onToggle(e);
        }
      }),
    );

    const onFocus = composeEventHandlers(stopWhenControlledOrDisabled, whenTrigger(trigger, 'focus', onOpen));

    const onBlur = composeEventHandlers(stopWhenControlledOrDisabled, whenTrigger(trigger, 'focus', onClose));

    const onContextMenu = composeEventHandlers(
      stopWhenControlledOrDisabled,
      whenTrigger(trigger, 'contextmenu', (e: Event) => {
        e.preventDefault();
        onToggle(e);
      }),
    );

    const onKeydown = composeEventHandlers(stopWhenControlledOrDisabled, (e: KeyboardEvent) => {
      const { code } = e;
      if (code === EVENT_CODE.enter || code === EVENT_CODE.space) {
        onToggle(e);
      }
    });

    return {
      onBlur,
      onContextMenu,
      onFocus,
      onMouseenter,
      onMouseleave,
      onClick,
      onKeydown,
      open,
      id,
      triggerRef,
    };
  },
});
</script>
