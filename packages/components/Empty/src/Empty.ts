import { ExtractPropTypes } from 'vue';
import type Empty from './Empty.vue';

export const emptyProps = {
  image: {
    type: String,
    default: '',
  },
  imageSize: Number,
  description: {
    type: String,
    default: '',
  },
};

export const emptyEmits = {};

export type EmptyProps = ExtractPropTypes<typeof emptyProps>;
export type EmptyEmits = typeof emptyEmits;
export type EmptyInstance = InstanceType<typeof Empty>;
