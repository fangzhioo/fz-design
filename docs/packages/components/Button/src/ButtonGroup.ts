import { ExtractPropTypes } from 'vue';
import { buttonProps } from './Button';
import type ButtonGroup from './ButtonGroup.vue';

export const buttonGroupProps = {
  size: buttonProps.size,
  type: buttonProps.type,
};
export type ButtonGroupProps = ExtractPropTypes<typeof buttonGroupProps>;

export type ButtonGroupInstance = InstanceType<typeof ButtonGroup>;
