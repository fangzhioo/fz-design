import { popperArrowProps, popperContentProps, popperTriggerProps } from '@fzui/components/Popper';
import { createModelToggleComposable, POPPER_CONTAINER_SELECTOR, useDelayedToggleProps } from '@fzui/hooks';
import { ExtractPropTypes, PropType } from 'vue';
import type Tooltip from './Tooltip.vue';

export type Trigger = 'hover' | 'focus' | 'click' | 'contextmenu';
const { useModelToggleProps, useModelToggle, useModelToggleEmits } = createModelToggleComposable('visible');

export const useTooltipModelToggle = useModelToggle;

export const tooltipContentProps = {
  ...useDelayedToggleProps,
  ...popperContentProps,
  appendTo: {
    type: [String, Object] as PropType<string | HTMLElement>,
    default: POPPER_CONTAINER_SELECTOR,
  },
  content: {
    type: String,
    default: '',
  },
  rawContent: {
    type: Boolean,
    default: false,
  },
  persistent: Boolean,
  ariaLabel: String,
  // because model toggle prop is generated dynamically
  // so the typing cannot be evaluated by typescript as type:
  // [name]: { type: Boolean, default: null }
  // so we need to declare that again for type checking.
  visible: {
    type: Boolean as PropType<boolean | null>,
    default: null,
  },
  transition: {
    type: String,
    default: 'fz-fade-in-linear',
  },
  teleported: {
    type: Boolean,
    default: true,
  },
  disabled: {
    type: Boolean,
  },
};

export const tooltipTriggerProps = {
  ...popperTriggerProps,
  disabled: Boolean,
  trigger: {
    type: [String, Array] as PropType<Trigger | Trigger[]>,
    default: 'hover',
  },
};

export const tooltipProps = {
  ...useModelToggleProps,
  ...tooltipContentProps,
  ...tooltipTriggerProps,
  ...popperArrowProps,
  openDelay: {
    type: Number,
  },
  visibleArrow: {
    type: Boolean,
    default: undefined,
  },
  hideAfter: {
    type: Number,
    default: 200,
  },
  showArrow: {
    type: Boolean,
    default: true,
  },
};

export const tooltipEmits = [...useModelToggleEmits, 'show', 'hide'];

export type TooltipProps = ExtractPropTypes<typeof tooltipProps>;
export type TooltipEmits = typeof tooltipEmits;
export type TooltipInstance = InstanceType<typeof Tooltip>;
