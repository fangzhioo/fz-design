import { CHANGE_EVENT, INPUT_EVENT, UPDATE_MODEL_EVENT } from '@fzui/constants';
import { ComponentSize } from '@fzui/hooks';
import type { CSSProperties, ComponentPublicInstance, ComputedRef, Ref, ExtractPropTypes, PropType } from 'vue';
import type Slider from './Slider.vue';

export interface ISliderProps {
  modelValue: number | number[];
  min: number;
  max: number;
  step: number;
  showInput: boolean;
  showInputControls: boolean;
  inputSize: string;
  showStops: boolean;
  showTooltip: boolean;
  formatTooltip: (val: number) => number | string;
  disabled: boolean;
  range: boolean;
  vertical: boolean;
  height: string;
  debounce: number;
  label: string;
  rangeStartLabel: string;
  rangeEndLabel: string;
  formatValueText: (val: number) => string;
  tooltipClass: string;
  marks?: Record<number, any>;
}

export interface ISliderInitData {
  firstValue: number;
  secondValue: number;
  oldValue?: number | number[];
  dragging: boolean;
  sliderSize: number;
}

export interface ISliderProvider {
  disabled: ComputedRef<boolean>;
  min: ComputedRef<number>;
  max: ComputedRef<number>;
  step: ComputedRef<number>;
  showTooltip: ComputedRef<boolean>;
  precision: ComputedRef<number>;
  sliderSize: ComputedRef<number>;
  formatTooltip: ComputedRef<(value: number) => number | string>;
  emitChange: () => void;
  resetSize: () => void;
  updateDragging: (val: boolean) => void;
}

export type Mark = {
  point: number;
  position: number;
  mark: { [s: string]: any };
};

export type Marks = ComputedRef<Mark[]>;

export type Stops = {
  stops: ComputedRef<number[]>;
  getStopStyle: (position: number) => CSSProperties;
};

export type Slide = {
  slider: Ref<HTMLElement>;
  firstButton: Ref<ISliderButton>;
  secondButton: Ref<ISliderButton>;
  sliderDisabled: ComputedRef<boolean>;
  minValue: ComputedRef<number>;
  maxValue: ComputedRef<number>;
  runwayStyle: ComputedRef<CSSProperties>;
  barStyle: ComputedRef<CSSProperties>;
  resetSize: () => void;
  setPosition: (percent: number) => void;
  emitChange: () => void;
  onSliderClick: (event: MouseEvent) => void;
};

export type ButtonRefs = {
  [s in 'firstButton' | 'secondButton']: Ref<ISliderButton | undefined>;
};

export interface ISliderButtonProps {
  modelValue: number;
  vertical: boolean;
  tooltipClass: string;
}

export interface ISliderButtonInitData {
  hovering: boolean;
  dragging: boolean;
  isClick: boolean;
  startX: number;
  currentX: number;
  startY: number;
  currentY: number;
  startPosition: number;
  newPosition: number;
  oldValue: number;
}

export interface ISliderButton extends ComponentPublicInstance {
  tooltip: Ref<HTMLElement | undefined>;
  showTooltip: Ref<boolean>;
  wrapperStyle: ComputedRef<CSSProperties>;
  formatValue: ComputedRef<number | string>;
  dragging: boolean;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
  onButtonDown: (event: MouseEvent | TouchEvent) => void;
  onKeyDown: (event: KeyboardEvent) => void;
  setPosition: (newPosition: number) => void;
}

export const sliderProps = {
  modelValue: {
    type: [Number, Array] as PropType<number | number[]>,
    default: 0,
  },
  id: {
    type: String,
    default: undefined,
  },
  min: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 100,
  },
  step: {
    type: Number,
    default: 1,
  },
  showInput: {
    type: Boolean,
    default: false,
  },
  showInputControls: {
    type: Boolean,
    default: true,
  },
  size: {
    type: String as PropType<ComponentSize>,
  },
  inputSize: {
    type: String as PropType<ComponentSize>,
  },
  showStops: {
    type: Boolean,
    default: false,
  },
  showTooltip: {
    type: Boolean,
    default: true,
  },
  formatTooltip: {
    type: Function as PropType<(val: number) => number | string>,
    default: undefined,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  range: {
    type: Boolean,
    default: false,
  },
  vertical: {
    type: Boolean,
    default: false,
  },
  height: {
    type: String,
    default: '',
  },
  debounce: {
    type: Number,
    default: 300,
  },
  label: {
    type: String,
    default: undefined,
  },
  rangeStartLabel: {
    type: String,
    default: undefined,
  },
  rangeEndLabel: {
    type: String,
    default: undefined,
  },
  formatValueText: {
    type: Function as PropType<(val: number) => string>,
    default: undefined,
  },
  tooltipClass: {
    type: String,
    default: undefined,
  },
  marks: Object,
};

export const sliderEmits = [UPDATE_MODEL_EVENT, CHANGE_EVENT, INPUT_EVENT];

export type SliderProps = ExtractPropTypes<typeof sliderProps>;
export type SliderEmits = typeof sliderEmits;
export type SliderInstance = InstanceType<typeof Slider>;
