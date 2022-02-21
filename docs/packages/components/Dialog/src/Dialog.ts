import { ExtractPropTypes, PropType } from 'vue';
import type Dialog from './Dialog.vue';
import { UPDATE_MODEL_EVENT } from '@fzui/constants';

export const dialogEmits = {
  open: () => true,
  opened: () => true,
  close: () => true,
  closed: () => true,
  [UPDATE_MODEL_EVENT]: (value: boolean) => typeof value === 'boolean',
};

export const dialogProps = {
  appendToBody: {
    type: Boolean,
    default: false,
  },
  beforeClose: {
    type: Function as PropType<(...args: any[]) => void>,
  },
  destroyOnClose: {
    type: Boolean,
    default: false,
  },
  center: {
    type: Boolean,
    default: false,
  },
  customClass: {
    type: String,
    default: '',
  },
  closeIcon: {
    type: String,
    default: 'close',
  },
  closeOnClickModal: {
    type: Boolean,
    default: true,
  },
  closeOnPressEscape: {
    type: Boolean,
    default: true,
  },
  fullscreen: {
    type: Boolean,
    default: false,
  },
  draggable: {
    type: Boolean,
    default: false,
  },
  lockScroll: {
    type: Boolean,
    default: true,
  },
  modal: {
    type: Boolean,
    default: true,
  },
  showClose: {
    type: Boolean,
    default: true,
  },
  title: {
    type: String,
    default: '',
  },
  openDelay: {
    type: Number,
    default: 0,
  },
  closeDelay: {
    type: Number,
    default: 0,
  },
  top: {
    type: String,
  },
  modelValue: {
    type: Boolean,
    required: true,
  },
  modalClass: String,
  width: {
    type: [String, Number],
  },
  zIndex: {
    type: Number,
  },
};

export type DialogProps = ExtractPropTypes<typeof dialogProps>;
export type DialogEmits = typeof dialogEmits;
export type DialogInstance = InstanceType<typeof Dialog>;
