import { ExtractPropTypes, PropType, VNode } from 'vue';
import type IMessage from './Message.vue';

export type MessageType = 'success' | 'info' | 'warning' | 'error';

export const messageEmits = {
  destroy: () => true,
};

export const messageProps = {
  customClass: {
    type: String,
    default: '',
  },
  center: {
    type: Boolean,
    default: false,
  },
  dangerouslyUseHTMLString: {
    type: Boolean,
    default: false,
  },
  duration: {
    type: Number,
    default: 3000,
  },
  icon: {
    type: String,
    default: '',
  },
  id: {
    type: String,
    default: '',
  },
  message: {
    type: [String, Object] as PropType<string | VNode>,
    default: '',
  },
  onClose: {
    type: Function as PropType<() => void>,
    required: false,
  },
  showClose: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String as PropType<MessageType>,
    default: 'info',
  },
  offset: {
    type: Number,
    default: 20,
  },
  zIndex: {
    type: Number,
    default: 0,
  },
  grouping: {
    type: Boolean,
    default: false,
  },
  repeatNum: {
    type: Number,
    default: 1,
  },
};

export type MessageProps = ExtractPropTypes<typeof messageProps>;
export type MessageEmits = typeof messageEmits;
export type MessageInstance = InstanceType<typeof IMessage>;

export type MessageOptions = Omit<MessageProps, 'id'> & {
  appendTo?: HTMLElement | string;
};
export type MessageOptionsTyped = Omit<MessageOptions, 'type'>;

export interface MessageHandle {
  close: () => void;
}

export type MessageParams = Partial<MessageOptions> | string | VNode;
export type MessageParamsTyped = Partial<MessageOptionsTyped> | string | VNode;

export type MessageFn = ((options?: MessageParams) => MessageHandle) & {
  closeAll(): void;
};
export type MessageTypedFn = (options?: MessageParamsTyped) => MessageHandle;

export interface Message extends MessageFn {
  success: MessageTypedFn;
  warning: MessageTypedFn;
  info: MessageTypedFn;
  error: MessageTypedFn;
}

type MessageQueueItem = {
  vm: VNode;
};

export type MessageQueue = MessageQueueItem[];
