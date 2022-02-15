<template>
  <fz-only-child v-if="!virtualTriggering" v-bind="$attrs" :aria-describedby="open ? id : undefined">
    <slot />
  </fz-only-child>
</template>

<script lang="ts">
import { defineComponent, inject, watch } from 'vue';
import { popperTriggerProps } from './Popper';
import { unwrapMeasurableEl } from './utils';
import { OnlyChild } from '@fzui/components/OnlyChild';
import { FZ_POPPER_INJECT_KEY } from '@fzui/constants';
import { useForwardRef } from '@fzui/hooks';

export default defineComponent({
  name: 'FzPopperTrigger',
  components: { FzOnlyChild: OnlyChild },
  inheritAttrs: false,
  props: {
    ...popperTriggerProps,
    onMouseenter: Function,
    onMouseleave: Function,
    onClick: Function,
    onKeydown: Function,
    onFocus: Function,
    onBlur: Function,
    onContextmenu: Function,
    id: String,
    open: Boolean,
  },
  setup(props) {
    const { triggerRef } = inject<any>(FZ_POPPER_INJECT_KEY, undefined)!;
    useForwardRef(triggerRef);

    watch(
      () => props.virtualRef,
      (val) => {
        if (val) {
          triggerRef.value = unwrapMeasurableEl(val);
        }
      },
      {
        immediate: true,
      },
    );

    watch(
      () => triggerRef.value,
      (el, prevEl) => {
        if (el && el instanceof HTMLElement) {
          ['onMouseenter', 'onMouseleave', 'onClick', 'onKeydown', 'onFocus', 'onBlur', 'onContextmenu'].forEach((eventName) => {
            const handler = props[eventName as any];
            if (handler) {
              (el as HTMLElement).addEventListener(eventName.slice(2).toLowerCase(), handler);
              (prevEl as HTMLElement)?.removeEventListener(eventName.slice(2).toLowerCase(), handler);
            }
          });
        }
      },
      {
        immediate: true,
      },
    );

    return {
      triggerRef,
    };
  },
});
</script>
