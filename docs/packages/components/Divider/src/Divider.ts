import { ExtractPropTypes, PropType } from 'vue';
import type Divider from './Divider.vue';

export type BorderStyle = CSSStyleDeclaration['borderStyle'];

export const dividerProps = {
  direction: {
    type: String as PropType<'horizontal' | 'vertical'>,
    default: 'horizontal',
  },
  contentPosition: {
    type: String as PropType<'left' | 'center' | 'right'>,
    default: 'center',
  },
  borderStyle: {
    type: String as PropType<BorderStyle>,
    default: 'solid',
  },
};

export const dividerEmits = {};

export type DividerProps = ExtractPropTypes<typeof dividerProps>;
export type DividerEmits = typeof dividerEmits;
export type DividerInstance = InstanceType<typeof Divider>;
