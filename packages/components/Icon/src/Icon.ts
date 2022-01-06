import { ExtractPropTypes } from 'vue';
import type Icon from './Icon.vue';

export const iconProps = {
  name: {
    type: String,
  },
};

export const iconEmits = {};

export type IconProps = ExtractPropTypes<typeof iconProps>;
export type IconEmits = typeof iconEmits;
export type IconInstance = InstanceType<typeof Icon>;
