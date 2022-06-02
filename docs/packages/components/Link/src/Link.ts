import { ExtractPropTypes, PropType } from 'vue';
import type Link from './Link.vue';

export type LinkType = 'primary' | 'success' | 'warning' | 'info' | 'danger' | 'default';

export const linkProps = {
  type: {
    type: String as PropType<LinkType>,
    default: 'default',
  },
  underline: {
    type: Boolean,
    default: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  href: {
    type: String,
    default: '',
  },
  icon: {
    type: String,
    default: '',
  },
};

export const linkEmits = {
  click: (evt: MouseEvent) => evt instanceof MouseEvent,
};

export type LinkProps = ExtractPropTypes<typeof linkProps>;
export type LinkEmits = typeof linkEmits;
export type LinkInstance = InstanceType<typeof Link>;
