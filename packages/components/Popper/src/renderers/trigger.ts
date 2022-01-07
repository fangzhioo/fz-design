import { cloneVNode } from 'vue';
import { getFirstValidNode } from '@fzui/utils/vnode';

import type { VNode, Ref, ComponentPublicInstance } from 'vue';
import { throwError } from '@fzui/utils/error';

type EventHandler = (e: Event) => any;
interface IRenderTriggerProps extends Record<string, unknown> {
  ref: string | Ref<ComponentPublicInstance | HTMLElement>;
  onClick?: EventHandler;
  onMouseover?: EventHandler;
  onMouseleave?: EventHandler;
  onFocus?: EventHandler;
}

export default function renderTrigger(trigger: VNode[] | undefined, extraProps: IRenderTriggerProps) {
  const firstElement = getFirstValidNode(trigger, 1);
  if (!firstElement) {
    throwError('renderTrigger', 'trigger expects single rooted node');
  }
  return cloneVNode(firstElement, extraProps, true);
}
