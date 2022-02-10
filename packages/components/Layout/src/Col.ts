import { ExtractPropTypes, PropType } from 'vue';

export type SizeObject = {
  span?: number;
  offset?: number;
};
export type Size = number | SizeObject;

export const colProps = {
  tag: {
    type: String,
    default: 'div',
  },
  span: {
    type: Number,
    default: 24,
  },
  offset: {
    type: Number,
    default: 0,
  },
  pull: {
    type: Number,
    default: 0,
  },
  push: {
    type: Number,
    default: 0,
  },
  xs: {
    type: [Number, Object] as PropType<Size>,
    default: () => ({}),
  },
  sm: {
    type: [Number, Object] as PropType<Size>,
    default: () => ({}),
  },
  md: {
    type: [Number, Object] as PropType<Size>,
    default: () => ({}),
  },
  lg: {
    type: [Number, Object] as PropType<Size>,
    default: () => ({}),
  },
  xl: {
    type: [Number, Object] as PropType<Size>,
    default: () => ({}),
  },
};

export type ColProps = ExtractPropTypes<typeof colProps>;
