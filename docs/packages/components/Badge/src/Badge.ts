import { ExtractPropTypes, PropType } from 'vue';
import type Badge from './Badge.vue';

export type BadgeType = 'primary' | 'success' | 'warning' | 'info' | 'error';

export const badgeEmits = {};

export const badgeProps = {
  value: {
    type: [String, Number],
    default: '',
  },
  max: {
    type: Number,
    default: 99,
  },
  isDot: {
    type: Boolean,
    default: false,
  },
  hidden: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String as PropType<BadgeType>,
    default: 'error',
  },
};

export type BadgeProps = ExtractPropTypes<typeof badgeProps>;
export type BadgeEmits = typeof badgeEmits;
export type BadgeInstance = InstanceType<typeof Badge>;
