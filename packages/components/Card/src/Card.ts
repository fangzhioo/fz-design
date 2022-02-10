import { ExtractPropTypes, PropType, StyleValue } from 'vue';
import type Card from './Card.vue';

export type CardShadow = 'always' | 'hover' | 'none';

export const cardEmits = {};

export const cardProps = {
  header: {
    type: String,
    default: '',
  },
  bodyStyle: {
    type: [String, Object, Array] as PropType<StyleValue>,
    default: '',
  },
  shadow: {
    type: String as PropType<CardShadow>,
    default: 'hover',
  },
};

export type CardProps = ExtractPropTypes<typeof cardProps>;
export type CardEmits = typeof cardEmits;
export type CardInstance = InstanceType<typeof Card>;
