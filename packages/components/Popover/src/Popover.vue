<template>
  <fz-tooltip
    ref="tooltipRef"
    v-bind="$attrs"
    :aria-label="title"
    :effect="effect"
    :enterable="enterable"
    :popper-class="kls"
    :popper-style="style"
    persistent
    @show="afterEnter"
    @hide="afterLeave"
  >
    <template v-if="$slots.reference">
      <slot name="reference" />
    </template>

    <template #content>
      <div v-if="title" class="fz-popover__title" role="title">
        {{ title }}
      </div>
      <slot>
        {{ content }}
      </slot>
    </template>
  </fz-tooltip>
</template>
<script lang="ts">
import { defineComponent, computed, ref, unref } from 'vue';
import { isString } from '@fzui/utils';
import { popoverEmits, popoverProps } from './Popover';
import { Tooltip } from '@fzui/components/Tooltip';

import type { StyleValue } from 'vue';

const COMPONENT_NAME = 'FzPopover';

export default defineComponent({
  name: COMPONENT_NAME,
  components: {
    FzTooltip: Tooltip,
  },
  props: popoverProps,
  emits: popoverEmits,
  setup(props, { emit }) {
    const tooltipRef = ref<InstanceType<typeof Tooltip> | null>(null);
    const popperRef = computed(() => {
      return unref(tooltipRef)?.popperRef;
    });
    const width = computed(() => {
      if (isString(props.width)) {
        return props.width as string;
      }
      return `${props.width}px`;
    });

    const style = computed(() => {
      return [
        {
          width: width.value,
        },
        props.popperStyle,
      ] as StyleValue;
    });

    const kls = computed(() => {
      return [{ 'fz-popover--plain': Boolean(props.content) }, 'fz-popover', props.popperClass];
    });

    const hide = () => {
      tooltipRef.value?.hide();
    };

    const afterEnter = () => {
      emit('after-enter');
    };

    const afterLeave = () => {
      emit('after-leave');
    };

    return {
      kls,
      style,
      tooltipRef,
      popperRef,
      hide,
      afterEnter,
      afterLeave,
    };
  },
});
</script>
