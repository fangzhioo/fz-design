import type { ExtractPropTypes, PropType } from 'vue';
import type Tag from './Tag.vue';

export type TagType = 'success' | 'info' | 'warning' | 'error' | 'primary';
export type TagSize = 'large' | 'default' | 'small';
export type TagEffect = 'dark' | 'light' | 'plain';

export const tagEmits = {
  close: (evt: MouseEvent) => evt instanceof MouseEvent,
  click: (evt: MouseEvent) => evt instanceof MouseEvent,
};

export const tagProps = {
  closable: Boolean,
  type: {
    type: String as PropType<TagType>,
    default: 'primary',
  },
  hit: Boolean,
  disableTransitions: Boolean,
  color: {
    type: String,
    default: '',
  },
  size: {
    type: String as PropType<TagSize>,
    default: 'default',
  },
  effect: {
    type: String as PropType<TagEffect>,
    default: 'light',
  },
};

export type TagProps = ExtractPropTypes<typeof tagProps>;
export type TagEmits = typeof tagEmits;
export type TagInstance = InstanceType<typeof Tag>;
