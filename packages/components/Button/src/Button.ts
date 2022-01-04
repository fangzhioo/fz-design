import { ExtractPropTypes, PropType } from 'vue';
import { ComponentSize } from 'packages/hooks/use-size';
import type Button from './Button.vue';

export type ButtonType = 'default' | 'primary' | 'success' | 'warning' | 'info' | 'error' | 'text';
export type ButtonNativeType = 'button' | 'submit' | 'reset';
export type ButtonSize = ComponentSize;

export const buttonEmits = {
  click: (evt: MouseEvent) => evt instanceof MouseEvent,
};

export const buttonProps = {
  size: {
    type: String as PropType<ButtonSize>,
    default: '',
  },
  type: {
    type: String as PropType<ButtonType>,
    default: 'default',
  },
  nativeType: {
    type: String as PropType<ButtonNativeType>,
    default: 'button',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  color: {
    type: String,
    default: '',
  },
  loading: {
    type: Boolean,
    default: false,
  },
  plain: {
    type: Boolean,
    default: false,
  },
  round: {
    type: Boolean,
    default: false,
  },
  circle: {
    type: Boolean,
    default: false,
  },
  autofocus: {
    type: Boolean,
    default: false,
  },
  autoInsertSpace: {
    type: Boolean,
    default: undefined,
  },
};

export type ButtonProps = ExtractPropTypes<typeof buttonProps>;
export type ButtonEmits = typeof buttonEmits;
export type ButtonInstance = InstanceType<typeof Button>;
