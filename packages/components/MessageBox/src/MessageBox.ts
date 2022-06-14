import { ComponentSize } from '@fzui/hooks';
import { TypeIconsNameMap } from '@fzui/utils';
import { CSSProperties, ExtractPropTypes, PropType } from 'vue';
import type MessageBox from './MessageBox.vue';

export type MessageType = '' | 'success' | 'warning' | 'info' | 'error';
export type Action = 'confirm' | 'close' | 'cancel';
export type MessageBoxType = '' | 'prompt' | 'alert' | 'confirm';
export type MessageBoxData = MessageBoxInputData & Action;
export interface MessageBoxInputData {
  value: string;
  action: Action;
}

export const TypeIconsMap: Record<MessageType, string> = {
  '': '',
  ...TypeIconsNameMap,
};

export interface MessageBoxInputValidator {
  (value: string): boolean | string;
}

export declare interface MessageBoxState {
  title?: string;
  message: string | null;
  type: MessageType;
  icon: string;
  customClass: string;
  customStyle: CSSProperties;
  showInput: boolean;
  inputValue: string | null;
  inputPlaceholder: string;
  inputType: string;
  inputPattern: RegExp | null;
  inputValidator: MessageBoxInputValidator | null;
  inputErrorMessage: string;
  showConfirmButton: boolean;
  showCancelButton: boolean;
  action: Action;
  dangerouslyUseHTMLString: boolean;
  confirmButtonText: string;
  cancelButtonText: string;
  confirmButtonLoading: boolean;
  cancelButtonLoading: boolean;
  confirmButtonClass: string;
  confirmButtonDisabled: boolean;
  cancelButtonClass: string;
  editorErrorMessage: string;

  beforeClose: null | ((action: Action, instance: MessageBoxState, done: () => void) => void);
  callback: null | Callback;
  distinguishCancelAndClose: boolean;
  modalFade: boolean;
  modalClass: string;
  // refer to: https://github.com/ElemeFE/element/commit/2999279ae34ef10c373ca795c87b020ed6753eed
  // seemed ok for now without this state.
  // isOnComposition: false, // temporary remove
  validateError: boolean;
  zIndex: number;
}

export type Callback = ((value: string, action: Action) => any) | ((action: Action) => any);

export const messageBoxProps = {
  buttonSize: {
    type: String as PropType<ComponentSize>,
  },
  modal: {
    type: Boolean,
    default: true,
  },
  lockScroll: {
    type: Boolean,
    default: true,
  },
  showClose: {
    type: Boolean,
    default: true,
  },
  closeOnClickModal: {
    type: Boolean,
    default: true,
  },
  closeOnPressEscape: {
    type: Boolean,
    default: true,
  },
  closeOnHashChange: {
    type: Boolean,
    default: true,
  },
  center: Boolean,
  draggable: Boolean,
  roundButton: {
    default: false,
    type: Boolean,
  },
  container: {
    type: String, // default append to body
    default: 'body',
  },
  boxType: {
    type: String as PropType<MessageBoxType>,
    default: '',
  },
};

export const messageBoxEmits = ['vanish', 'action'];

export type MessageBoxProps = ExtractPropTypes<typeof messageBoxProps>;
export type MessageBoxEmits = typeof messageBoxEmits;
export type MessageBoxInstance = InstanceType<typeof MessageBox>;
