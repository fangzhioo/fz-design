import { ComponentSize } from '@fzui/hooks';
import { hasOwn, isClient, isObject, isString, isUndefined } from '@fzui/utils';
import { AppContext, ComponentPublicInstance, CSSProperties, h, isVNode, render, VNode, watch } from 'vue';
import { Action, Callback, MessageBoxData, MessageBoxInputValidator, MessageBoxState, MessageBoxType, MessageType } from './MessageBox';
import MessageBoxConstructor from './MessageBox.vue';

/** Options used in MessageBox */
export interface FzMessageBoxOptions {
  /** Callback before MessageBox closes, and it will prevent MessageBox from closing */
  beforeClose?: (action: Action, instance: MessageBoxState, done: () => void) => void;

  /** Custom class name for MessageBox */
  customClass?: string;

  /** Custom inline style for MessageBox */
  customStyle?: CSSProperties;

  /** MessageBox closing callback if you don't prefer Promise */
  callback?: Callback;

  /** Text content of cancel button */
  cancelButtonText?: string;

  /** Text content of confirm button */
  confirmButtonText?: string;

  /** Custom class name of cancel button */
  cancelButtonClass?: string;

  /** Custom class name of confirm button */
  confirmButtonClass?: string;

  /** Whether to align the content in center */
  center?: boolean;

  /** Whether MessageBox can be drag */
  draggable?: boolean;

  /** Content of the MessageBox */
  message?: string | VNode;

  /** Title of the MessageBox */
  title?: string;

  /** Message type, used for icon display */
  type?: MessageType;

  /** Message box type */
  boxType?: MessageBoxType;

  /** Custom icon component */
  icon?: string;

  /** Whether message is treated as HTML string */
  dangerouslyUseHTMLString?: boolean;

  /** Whether to distinguish canceling and closing */
  distinguishCancelAndClose?: boolean;

  /** Whether to lock body scroll when MessageBox prompts */
  lockScroll?: boolean;

  /** Whether to show a cancel button */
  showCancelButton?: boolean;

  /** Whether to show a confirm button */
  showConfirmButton?: boolean;

  /** Whether to show a close button */
  showClose?: boolean;

  /** Whether to use round button */
  roundButton?: boolean;

  /** Whether MessageBox can be closed by clicking the mask */
  closeOnClickModal?: boolean;

  /** Whether MessageBox can be closed by pressing the ESC */
  closeOnPressEscape?: boolean;

  /** Whether to close MessageBox when hash changes */
  closeOnHashChange?: boolean;

  /** Whether to show an input */
  showInput?: boolean;

  /** Placeholder of input */
  inputPlaceholder?: string;

  /** Initial value of input */
  inputValue?: string;

  /** Regexp for the input */
  inputPattern?: RegExp;

  /** Input Type: text, textArea, password or number */
  inputType?: string;

  /** Validation function for the input. Should returns a boolean or string. If a string is returned, it will be assigned to inputErrorMessage */
  inputValidator?: MessageBoxInputValidator;

  /** Error message when validation fails */
  inputErrorMessage?: string;

  /** Custom size of confirm and cancel buttons */
  buttonSize?: ComponentSize;
}

export type FzMessageBoxShortcutMethod = ((
  message: FzMessageBoxOptions['message'],
  title: FzMessageBoxOptions['title'],
  options?: FzMessageBoxOptions,
  appContext?: AppContext | null,
) => Promise<MessageBoxData>) &
  ((message: FzMessageBoxOptions['message'], options?: FzMessageBoxOptions, appContext?: AppContext | null) => Promise<MessageBoxData>);

export interface IFzMessageBox {
  _context: AppContext | null;

  /** Show a message box */
  // (message: string, title?: string, type?: string): Promise<MessageBoxData>

  /** Show a message box */
  (options: FzMessageBoxOptions, appContext?: AppContext | null): Promise<MessageBoxData>;

  /** Show an alert message box */
  alert: FzMessageBoxShortcutMethod;

  /** Show a confirm message box */
  confirm: FzMessageBoxShortcutMethod;

  /** Show a prompt message box */
  prompt: FzMessageBoxShortcutMethod;

  /** Close current message box */
  close(): void;
}

const messageInstance = new Map<
  ComponentPublicInstance<{ doClose: () => void }>, // marking doClose as function
  {
    options: any;
    callback: Callback;
    resolve: (res: any) => void;
    reject: (reason?: any) => void;
  }
>();

const initInstance = (props: any, container: HTMLElement, appContext: AppContext | null = null) => {
  const vnode = h(MessageBoxConstructor, props);
  vnode.appContext = appContext;
  render(vnode, container);
  document.body.appendChild(container.firstElementChild!);
  return vnode.component;
};

const genContainer = () => {
  return document.createElement('div');
};

const showMessage = (options: any, appContext?: AppContext | null) => {
  const container = genContainer();
  // Adding destruct method.
  // when transition leaves emitting `vanish` evt. so that we can do the clean job.
  options.onVanish = () => {
    // not sure if this causes mem leak, need proof to verify that.
    // maybe calling out like 1000 msg-box then close them all.
    render(null, container);
    messageInstance.delete(vm); // Remove vm to avoid mem leak.
    // here we were suppose to call document.body.removeChild(container.firstElementChild)
    // but render(null, container) did that job for us. so that we do not call that directly
  };

  options.onAction = (action: Action) => {
    const currentMsg = messageInstance.get(vm)!;
    let resolve: Action | { value: string | null; action: Action };
    if (options.showInput) {
      resolve = { value: vm.inputValue, action };
    } else {
      resolve = action;
    }
    if (options.callback) {
      options.callback(resolve, instance.proxy);
    } else {
      if (action === 'cancel' || action === 'close') {
        if (options.distinguishCancelAndClose && action !== 'cancel') {
          currentMsg.reject('close');
        } else {
          currentMsg.reject('cancel');
        }
      } else {
        currentMsg.resolve(resolve);
      }
    }
  };

  const instance = initInstance(options, container, appContext)!;

  // This is how we use message box programmably.
  // Maybe consider releasing a template version?
  // get component instance like v2.
  const vm = instance.proxy as ComponentPublicInstance<
    {
      visible: boolean;
      doClose: () => void;
    } & MessageBoxState
  >;

  for (const prop in options) {
    if (hasOwn(options, prop) && !hasOwn(vm.$props, prop)) {
      (vm as any)[prop] = options[prop];
    }
  }

  watch(
    () => vm.message,
    (newVal, oldVal) => {
      if (isVNode(newVal)) {
        // Override slots since message is vnode type.
        instance.slots.default = () => [newVal];
      } else if (isVNode(oldVal) && !isVNode(newVal)) {
        delete instance.slots.default;
      }
    },
    {
      immediate: true,
    },
  );

  // change visibility after everything is settled
  vm.visible = true;
  return vm;
};

async function MessageBox(options: FzMessageBoxOptions, appContext?: AppContext | null): Promise<MessageBoxData>;

function MessageBox(options: FzMessageBoxOptions | string | VNode, appContext: AppContext | null = null): Promise<{ value: string; action: Action } | Action> {
  if (!isClient) return Promise.reject();
  let callback: any;
  if (isString(options) || isVNode(options)) {
    options = {
      message: options,
    };
  } else {
    callback = options.callback;
  }

  return new Promise((resolve, reject) => {
    const vm = showMessage(options, appContext ?? (MessageBox as any)._context);
    // collect this vm in order to handle upcoming events.
    messageInstance.set(vm, {
      options,
      callback,
      resolve,
      reject,
    });
  });
}

const MESSAGE_BOX_VARIANTS = ['alert', 'confirm', 'prompt'];
const MESSAGE_BOX_DEFAULT_OPTS: Record<typeof MESSAGE_BOX_VARIANTS[number], Partial<FzMessageBoxOptions>> = {
  alert: { closeOnPressEscape: false, closeOnClickModal: false },
  confirm: { showCancelButton: true },
  prompt: { showCancelButton: true, showInput: true },
};

MESSAGE_BOX_VARIANTS.forEach((boxType) => {
  (MessageBox as any)[boxType] = messageBoxFactory(boxType);
});

function messageBoxFactory(boxType: typeof MESSAGE_BOX_VARIANTS[number]) {
  return (message: string, titleOrOpts: string | FzMessageBoxOptions, options?: FzMessageBoxOptions, appContext?: AppContext | null) => {
    let title: string;
    if (isObject(titleOrOpts)) {
      options = titleOrOpts;
      title = '';
    } else if (isUndefined(titleOrOpts)) {
      title = '';
    } else {
      title = titleOrOpts;
    }

    return MessageBox(
      Object.assign(
        {
          title,
          message,
          type: '',
          ...MESSAGE_BOX_DEFAULT_OPTS[boxType],
        },
        options,
        {
          boxType,
        },
      ),
      appContext,
    );
  };
}

MessageBox.close = () => {
  // instance.setupInstall.doClose()
  // instance.setupInstall.state.visible = false

  messageInstance.forEach((_, vm) => {
    vm.doClose();
  });

  messageInstance.clear();
};

(MessageBox as any)._context = null;

export default MessageBox as IFzMessageBox;
