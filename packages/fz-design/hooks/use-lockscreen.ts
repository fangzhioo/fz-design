import { watch, isRef, onScopeDispose } from 'vue';
import { throwError, addClass, removeClass, hasClass, getStyle, getScrollBarWidth, isClient } from '../utils';

import type { Ref } from 'vue';

/**
 * Hook that monitoring the ref value to lock or unlock the screen.
 * When the trigger became true, it assumes modal is now opened and vice versa.
 * @param trigger {Ref<boolean>}
 */
export const useLockscreen = (trigger: Ref<boolean>) => {
  if (!isRef(trigger)) {
    throwError('[useLockscreen]', 'You need to pass a ref param to this function');
  }
  const FZ_POPUP_PARENT_HIDDEN_CLASSNAME = 'fz-popup-parent--hidden';
  if (!isClient || hasClass(document.body, FZ_POPUP_PARENT_HIDDEN_CLASSNAME)) {
    return;
  }

  let scrollBarWidth = 0;
  let withoutHiddenClass = false;
  let bodyPaddingRight = '0';
  let computedBodyPaddingRight = 0;

  const cleanup = () => {
    removeClass(document.body, FZ_POPUP_PARENT_HIDDEN_CLASSNAME);
    if (withoutHiddenClass) {
      document.body.style.paddingRight = bodyPaddingRight;
    }
  };
  watch(trigger, (val) => {
    if (!val) {
      cleanup();
      return;
    }

    withoutHiddenClass = !hasClass(document.body, FZ_POPUP_PARENT_HIDDEN_CLASSNAME);
    if (withoutHiddenClass) {
      bodyPaddingRight = document.body.style.paddingRight;
      computedBodyPaddingRight = parseInt(getStyle(document.body, 'paddingRight'), 10);
    }
    scrollBarWidth = getScrollBarWidth();
    const bodyHasOverflow = document.documentElement.clientHeight < document.body.scrollHeight;
    const bodyOverflowY = getStyle(document.body, 'overflowY');
    if (scrollBarWidth > 0 && (bodyHasOverflow || bodyOverflowY === 'scroll') && withoutHiddenClass) {
      document.body.style.paddingRight = `${computedBodyPaddingRight + scrollBarWidth}px`;
    }
    addClass(document.body, FZ_POPUP_PARENT_HIDDEN_CLASSNAME);
  });
  onScopeDispose(() => cleanup());
};
