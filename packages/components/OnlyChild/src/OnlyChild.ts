import { cloneVNode, Comment, defineComponent, Fragment, h, Text, withDirectives, inject } from 'vue';
import { NOOP, isObject } from '@vue/shared';
import type { VNode, Ref } from 'vue';
import { FZ_FORWARD_REF_INJECT_KEY } from '@fzui/constants';
import { useForwardRefDirective } from '@fzui/hooks';
import { debugWarn } from '@fzui/utils';

const NAME = 'FzOnlyChild';

function wrapTextContent(s: string | VNode) {
  return h('span', { class: 'fz-only-child__content' }, [s]);
}

function findFirstLegitChild(node: VNode[] | undefined): any {
  if (!node) {
    return null;
  }
  const children = node as VNode[];
  for (let i = 0; i < children.length; i++) {
    /**
     * when user uses h(Fragment, [text]) to render plain string,
     * this switch case just cannot handle, when the value is primitives
     * we should just return the wrapped string
     */
    const child = children[i];
    if (isObject(child)) {
      switch (child.type) {
        case Comment:
          // eslint-disable-next-line no-continue
          continue;
        case Text:
          return wrapTextContent(child);
        case Fragment:
          return findFirstLegitChild(child.children as VNode[]);
        default:
          return child;
      }
    }
    return wrapTextContent(child);
  }
  return null;
}

const OnlyChild = defineComponent({
  name: NAME,
  setup(props, { slots, attrs }) {
    const forwardRefInjection = inject<any>(FZ_FORWARD_REF_INJECT_KEY, undefined);
    const forwardRefDirective = useForwardRefDirective(forwardRefInjection.setForwardRef ?? NOOP);
    return () => {
      const defaultSlot = slots.default?.(attrs);
      if (!defaultSlot) {
        return null;
      }

      if (defaultSlot.length > 1) {
        debugWarn(NAME, 'FzOnlyChild requires exact only one valid child.');
        return null;
      }

      const firstLegitNode = findFirstLegitChild(defaultSlot);
      if (!firstLegitNode) {
        debugWarn(NAME, 'no valid child node found');
        return null;
      }

      return withDirectives(cloneVNode(firstLegitNode, attrs), [[forwardRefDirective]]);
    };
  },
});

export type OnlyChildExpose = {
  forwardRef: Ref<HTMLElement>;
};

export default OnlyChild;
