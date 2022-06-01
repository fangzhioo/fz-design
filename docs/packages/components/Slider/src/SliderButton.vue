<template>
  <div
    ref="button"
    :class="['fz-slider__button-wrapper', { hover: hovering, dragging }]"
    :style="wrapperStyle"
    tabindex="0"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @mousedown="onButtonDown"
    @touchstart="onButtonDown"
    @focus="handleMouseEnter"
    @blur="handleMouseLeave"
    @keydown="onKeyDown"
  >
    <fz-tooltip
      ref="tooltip"
      v-model:visible="tooltipVisible"
      placement="top"
      :stop-popper-mouse-event="false"
      :popper-class="tooltipClass"
      :disabled="!showTooltip"
      persistent
    >
      <template #content>
        <span>{{ formatValue }}</span>
      </template>
      <div :class="['fz-slider__button', { hover: hovering, dragging }]" />
    </fz-tooltip>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import { Tooltip } from '@fzui/components';
import { UPDATE_MODEL_EVENT } from '@fzui/constants';
import { useSliderButton } from './hooks/useSliderButton';

export default defineComponent({
  name: 'FzSliderButton',

  components: {
    FzTooltip: Tooltip,
  },

  props: {
    modelValue: {
      type: Number,
      default: 0,
    },
    vertical: {
      type: Boolean,
      default: false,
    },
    tooltipClass: {
      type: String,
      default: '',
    },
  },

  emits: [UPDATE_MODEL_EVENT] as any,

  setup(props, { emit }) {
    const initData = reactive({
      hovering: false,
      dragging: false,
      isClick: false,
      startX: 0,
      currentX: 0,
      startY: 0,
      currentY: 0,
      startPosition: 0,
      newPosition: 0,
      oldValue: props.modelValue,
    });

    const {
      button,
      tooltip,
      showTooltip,
      tooltipVisible,
      wrapperStyle,
      formatValue,
      handleMouseEnter,
      handleMouseLeave,
      onButtonDown,
      onKeyDown,
      setPosition,
    } = useSliderButton(props, initData, emit);

    const { hovering, dragging } = toRefs(initData);

    return {
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
      setPosition,

      hovering,
      dragging,
    };
  },
});
</script>
