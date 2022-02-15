import type { ExtractPropTypes, PropType, StyleValue } from 'vue';
import type { Placement, Options } from '@popperjs/core';
import { ClassType } from '@fzui/utils';

export type Measurable = {
  getBoundingClientRect: () => DOMRect;
};
export const Effect = {
  LIGHT: 'light',
  DARK: 'dark',
};
export type PopperjsCoreOptions = Options;
export type PopperjsCorePlacement = Placement;

export const popperCoreConfigProps = {
  boundariesPadding: {
    type: Number,
    default: 0,
  },
  fallbackPlacements: {
    type: Array as PropType<PopperjsCorePlacement[]>,
    default: () => [],
  },
  gpuAcceleration: {
    type: Boolean,
    default: true,
  },
  offset: {
    type: Number,
    default: 12,
  },
  placement: {
    type: String as PropType<PopperjsCorePlacement>,
    default: 'bottom',
  },
  popperOptions: {
    type: Object as PropType<Partial<PopperjsCoreOptions>>,
    default: () => ({}),
  },
  strategy: {
    type: String as PropType<'fixed' | 'absolute'>,
    default: 'absolute',
  },
};

export const popperArrowProps = {
  arrowOffset: {
    type: Number,
    default: 5,
  },
};

export const popperContentProps = {
  ...popperCoreConfigProps,
  style: { type: [String, Array, Object] as PropType<StyleValue> },
  className: { type: [String, Array, Object] as PropType<ClassType> },
  effect: {
    type: String,
    default: 'dark',
  },
  enterable: {
    type: Boolean,
    default: true,
  },
  pure: {
    type: Boolean,
  },
  popperClass: {
    type: [String, Array, Object] as PropType<ClassType>,
  },
  popperStyle: {
    type: [String, Array, Object] as PropType<StyleValue>,
  },
  referenceEl: {
    type: Object as PropType<HTMLElement>,
  },
  stopPopperMouseEvent: {
    type: Boolean,
    default: true,
  },
  zIndex: Number,
};

export const popperTriggerProps = {
  virtualRef: { type: Object as PropType<Measurable> },
  virtualTriggering: { type: Boolean },
};

export const popperProps = {
  autoClose: {
    type: Number,
    default: 0,
  },
  cutoff: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
};

export type PopperProps = ExtractPropTypes<typeof popperProps>;
export type PopperCoreConfigProps = ExtractPropTypes<typeof popperCoreConfigProps>;
