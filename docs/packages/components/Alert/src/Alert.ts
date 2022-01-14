import { ExtractPropTypes, PropType } from 'vue';
import type Alert from './Alert.vue';

export type AlertEffect = 'light' | 'dark';
export type AlertType = 'success' | 'warning' | 'info' | 'error';

export const TypeIconsNameMap: Record<AlertType, string> = {
  success: 'success-filling',
  warning: 'warning-filling',
  info: 'prompt-filling',
  error: 'delete-filling',
};

export const alertEmits = {
  close: (evt: MouseEvent) => evt instanceof MouseEvent,
};

export const alertProps = {
  title: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  type: {
    type: String as PropType<AlertType>,
    default: 'info',
  },
  closable: {
    type: Boolean,
    default: true,
  },
  closeText: {
    type: String,
    default: '',
  },
  showIcon: {
    type: Boolean,
    default: false,
  },
  center: {
    type: Boolean,
    default: false,
  },
  effect: {
    type: String as PropType<AlertEffect>,
    default: 'light',
  },
};

export type AlertProps = ExtractPropTypes<typeof alertProps>;
export type AlertEmits = typeof alertEmits;
export type AlertInstance = InstanceType<typeof Alert>;
