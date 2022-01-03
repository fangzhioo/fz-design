import { ExtractPropTypes } from 'vue';
import type Container from './Container.vue';

export const containerEmits = {};

export const containerProps = {
  direction: {
    type: String,
    default: '', // vertical horizontal
  },
};

export type ContainerProps = ExtractPropTypes<typeof containerProps>;
export type ContainerEmits = typeof containerEmits;
export type ContainerInstance = InstanceType<typeof Container>;
