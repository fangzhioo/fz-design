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

export type ScrollbarProps = ExtractPropTypes<typeof scrollbarProps>;
export type ScrollbarEmits = typeof scrollbarEmits;
export type ScrollbarInstance = InstanceType<typeof Scrollbar>;
