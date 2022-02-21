import { isNumber } from '@fzui/utils';
import { ExtractPropTypes, PropType, StyleValue } from 'vue';
import type Scrollbar from './Scrollbar.vue';

export const scrollbarEmits = {
  scroll: ({ scrollTop, scrollLeft }: { scrollTop: number; scrollLeft: number }) => isNumber(scrollTop) && isNumber(scrollLeft),
};

export interface ScrollbarContext {
  scrollbarElement: HTMLDivElement;
  wrapElement: HTMLDivElement;
}

export const scrollbarProps = {
  height: {
    type: [String, Number],
    default: '',
  },
  maxHeight: {
    type: [String, Number],
    default: '',
  },
  native: {
    type: Boolean,
    default: false,
  },
  wrapStyle: {
    type: [String, Object, Array] as PropType<StyleValue>,
    default: '',
  },
  wrapClass: {
    type: [String, Array],
    default: '',
  },
  viewClass: {
    type: [String, Array],
    default: '',
  },
  viewStyle: {
    type: [String, Array],
    default: '',
  },
  noresize: {
    type: Boolean, // 如果 container 尺寸不会发生变化，最好设置它可以优化性能
    default: false,
  },
  tag: {
    type: String,
    default: 'div',
  },
  always: {
    type: Boolean,
    default: false,
  },
  minSize: {
    type: Number,
    default: 20,
  },
};

export const barThumbProps = {
  vertical: Boolean,
  size: String,
  move: Number,
  ratio: {
    type: Number,
    required: true,
  },
  always: Boolean,
};

export const barProps = {
  always: {
    type: Boolean,
    default: true,
  },
  width: {
    type: String,
    default: '',
  },
  height: {
    type: String,
    default: '',
  },
  ratioX: {
    type: Number,
    default: 1,
  },
  ratioY: {
    type: Number,
    default: 1,
  },
};

interface BarAttrMap {
  offset: 'offsetHeight' | 'offsetWidth';
  scroll: 'scrollTop' | 'scrollLeft';
  scrollSize: 'scrollHeight' | 'scrollWidth';
  size: 'height' | 'width';
  key: 'vertical' | 'horizontal';
  axis: 'Y' | 'X';
  client: 'clientY' | 'clientX';
  direction: 'top' | 'left';
}

export const BAR_MAP: Record<'vertical' | 'horizontal', BarAttrMap> = {
  vertical: {
    offset: 'offsetHeight',
    scroll: 'scrollTop',
    scrollSize: 'scrollHeight',
    size: 'height',
    key: 'vertical',
    axis: 'Y',
    client: 'clientY',
    direction: 'top',
  },
  horizontal: {
    offset: 'offsetWidth',
    scroll: 'scrollLeft',
    scrollSize: 'scrollWidth',
    size: 'width',
    key: 'horizontal',
    axis: 'X',
    client: 'clientX',
    direction: 'left',
  },
};

export type BarProps = ExtractPropTypes<typeof barProps>;
export type BarThumbProps = ExtractPropTypes<typeof barThumbProps>;
export type ScrollbarProps = ExtractPropTypes<typeof scrollbarProps>;
export type ScrollbarEmits = typeof scrollbarEmits;
export type ScrollbarInstance = InstanceType<typeof Scrollbar>;
