import { createVNode, isVNode, render } from 'vue';
import type { ComponentPublicInstance, VNode } from 'vue';
import { useZIndex } from '@fzui/hooks';
import { debugWarn, isClient } from '@fzui/utils';
import { Message, MessageFn, MessageProps, MessageQueue, MessageType } from './Message';
import MessageConstructor from './Message.vue';

const instances: MessageQueue = [];
const messageTypes: MessageType[] = ['success', 'info', 'warning', 'error'];
let seed = 1;

export function close(id: string, userOnClose?: (vm: VNode) => void): void {
  const idx = instances.findIndex(({ vm }) => id === vm.component!.props.id);
  if (idx === -1) {
    return;
  }

  const { vm } = instances[idx];
  if (!vm || !vm.el) {
    return;
  }
  userOnClose?.(vm);

  const removedHeight = vm.el.offsetHeight;
  instances.splice(idx, 1);

  // adjust other instances vertical offset
  const len = instances.length;
  if (len < 1) {
    return;
  }
  for (let i = idx; i < len; i++) {
    const ivm = instances[i].vm;
    if (ivm && ivm.el && ivm.component) {
      const pos = parseInt(ivm.el.style['top'], 10) - removedHeight - 16;
      ivm.component.props.offset = pos;
    }
  }
}

const message: MessageFn & Partial<Message> = (op = {}) => {
  let options = op;
  if (!isClient) {
    return { close: () => undefined };
  }

  if (!isVNode(options) && typeof options === 'object' && options.grouping && !isVNode(options.message) && instances.length) {
    const tempVm: any = instances.find((item) => `${item.vm.props?.message ?? ''}` === `${(options as any).message ?? ''}`);
    if (tempVm) {
      tempVm.vm.component!.props.repeatNum += 1;
      tempVm.vm.component!.props.type = options?.type;
      return {
        close: () => ((tempVm.vm.component!.proxy as ComponentPublicInstance<{ visible: boolean }>).visible = false),
      };
    }
  }

  if (typeof options === 'string' || isVNode(options)) {
    options = { message: options };
  }

  let verticalOffset = options.offset || 20;
  instances.forEach(({ vm }) => {
    verticalOffset += (vm.el?.offsetHeight || 0) + 16;
  });
  verticalOffset += 16;

  const { nextZIndex } = useZIndex();

  const id = `message_${seed++}`;
  const userOnClose = options.onClose;
  const props: Partial<MessageProps> = {
    zIndex: nextZIndex(),
    offset: verticalOffset,
    ...options,
    id,
    onClose: () => {
      close(id, userOnClose);
    },
  };

  let appendTo: HTMLElement | null = document.body;
  if (options.appendTo instanceof HTMLElement) {
    appendTo = options.appendTo;
  } else if (typeof options.appendTo === 'string') {
    appendTo = document.querySelector(options.appendTo);
  }
  // should fallback to default value with a warning
  if (!(appendTo instanceof HTMLElement)) {
    debugWarn('FzMessage', 'the appendTo option is not an HTMLElement. Falling back to document.body.');
    appendTo = document.body;
  }

  const container = document.createElement('div');

  container.className = `container_${id}`;

  const message = props.message;
  const vm = createVNode(MessageConstructor, props, isVNode(props.message) ? { default: () => message } : null);

  // clean message element preventing mem leak
  vm.props!.onDestroy = () => {
    render(null, container);
    // since the element is destroy, then the VNode should be collected by GC as well
    // we do not want cause any mem leak because we have returned vm as a reference to users
    // so that we manually set it to false.
  };

  render(vm, container);
  // instances will remove this item when close function gets called. So we do not need to worry about it.
  instances.push({ vm });
  appendTo.appendChild(container.firstElementChild!);

  return {
    // instead of calling the onClose function directly, setting this value so that we can have the full lifecycle
    // for out component, so that all closing steps will not be skipped.
    close: () => ((vm.component!.proxy as ComponentPublicInstance<{ visible: boolean }>).visible = false),
  };
};

messageTypes.forEach((type) => {
  message[type] = (op = {}) => {
    let options = op;
    if (typeof options === 'string' || isVNode(options)) {
      options = {
        message: options,
      };
    }
    return message({
      ...options,
      type,
    });
  };
});

export function closeAll(): void {
  for (let i = instances.length - 1; i >= 0; i--) {
    const instance = instances[i].vm.component;
    (instance?.proxy as any)?.close();
  }
}

message.closeAll = closeAll;

export default message as Message;
