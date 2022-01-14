import { ComponentSize } from '@fzui/hooks';
import { ExtractPropTypes, PropType } from 'vue';
import type { ObjectFitProperty } from 'csstype';
import type Avatar from './Avatar.vue';

export type AvatarSize = ComponentSize;
export type AvatarShape = 'circle' | 'square';
export type AvatarFit = ObjectFitProperty;

export const avatarEmits = {
  error: (evt: Event) => evt instanceof Event,
};

export const avatarProps = {
  size: {
    type: [Number, String] as PropType<AvatarSize>,
    default: 'large',
    validator: (val: unknown) => typeof val === 'number' || typeof val === 'string',
  },
  shape: {
    type: String as PropType<AvatarShape>,
    default: 'circle',
  },
  icon: {
    type: String,
  },
  src: {
    type: String,
    default: '',
  },
  alt: String,
  srcSet: String,
  fit: {
    type: String as PropType<AvatarFit>,
    default: 'cover',
  },
};

export type AvatarProps = ExtractPropTypes<typeof avatarProps>;
export type AvatarEmits = typeof avatarEmits;
export type AvatarInstance = InstanceType<typeof Avatar>;
