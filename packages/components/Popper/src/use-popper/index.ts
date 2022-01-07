/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-use-before-define */
import { computed, ref, reactive, watch, unref } from 'vue';
import { createPopper } from '@popperjs/core';
import usePopperOptions from './popper-options';

import type { ComponentPublicInstance, CSSProperties, SetupContext, Ref } from 'vue';
import type { IPopperOptions, TriggerType, PopperInstance, RefElement } from '../Popper';
import { generateUUID, isArray, isBoolean, isHTMLElement, isString } from '@fzui/utils';
import PopupManager from '@fzui/utils/popup-manager';
import { Nullable } from '@fzui/utils/types';
import { UPDATE_VISIBLE_EVENT } from '@fzui/utils/constants';

export type ElementType = ComponentPublicInstance | HTMLElement;
export type EmitType = 'update:visible' | 'after-enter' | 'after-leave' | 'before-enter' | 'before-leave';

export interface PopperEvents {
  onClick?: (e: Event) => void;
  onMouseenter?: (e: Event) => void;
  onMouseleave?: (e: Event) => void;
  onFocus?: (e: Event) => void;
  onBlur?: (e: Event) => void;
}

const triggerEventsMap: Partial<Record<TriggerType, (keyof PopperEvents)[]>> = {
  click: ['onClick'],
  hover: ['onMouseenter', 'onMouseleave'],
  focus: ['onFocus', 'onBlur'],
};

export const DEFAULT_TRIGGER = ['hover'];
const usePopper = (props: IPopperOptions, { emit }: SetupContext<EmitType[]>) => {
  const arrowRef = ref<HTMLElement>();
  const triggerRef = ref() as Ref<ElementType>;
  const popperRef = ref<RefElement>();

  const popperId = `fz-popper-${generateUUID()}`;
  let popperInstance: Nullable<PopperInstance> = null;
  let showTimer: any = null;
  let hideTimer: any = null;
  let triggerFocused = false;

  const isManualMode = () => props.manualMode || props.trigger === 'manual';

  const popperStyle = ref<CSSProperties>({ zIndex: PopupManager.nextZIndex() });

  const popperOptions = usePopperOptions(props, {
    arrow: arrowRef as any,
  });

  const state = reactive({
    visible: Boolean(props.visible),
  });
  // visible has been taken by props.visible, avoiding name collision
  // Either marking type here or setter parameter
  const visibility = computed<boolean>({
    get() {
      if (props.disabled) {
        return false;
      }
      return isBoolean(props.visible) ? props.visible : state.visible;
    },
    set(val) {
      if (isManualMode()) {
        return;
      }
      isBoolean(props.visible) ? emit(UPDATE_VISIBLE_EVENT, val) : (state.visible = val);
    },
  });

  function _show() {
    if (props.autoClose > 0) {
      hideTimer = window.setTimeout(() => {
        _hide();
      }, props.autoClose);
    }
    visibility.value = true;
  }

  function _hide() {
    visibility.value = false;
  }

  function clearTimers() {
    clearTimeout(showTimer);
    clearTimeout(hideTimer);
  }

  const show = () => {
    if (isManualMode() || props.disabled) {
      return;
    }
    clearTimers();
    if (props.showAfter === 0) {
      _show();
    } else {
      showTimer = window.setTimeout(() => {
        _show();
      }, props.showAfter);
    }
  };

  const hide = () => {
    if (isManualMode()) {
      return;
    }
    clearTimers();
    if (props.hideAfter > 0) {
      hideTimer = window.setTimeout(() => {
        close();
      }, props.hideAfter);
    } else {
      close();
    }
  };
  const close = () => {
    _hide();
    if (props.disabled) {
      doDestroy(true);
    }
  };

  function onPopperMouseEnter() {
    // if trigger is click, user won't be able to close popper when
    // user tries to move the mouse over popper contents
    if (props.enterable && props.trigger !== 'click') {
      clearTimeout(hideTimer);
    }
  }

  function onPopperMouseLeave() {
    const { trigger } = props;
    const shouldPrevent =
      (isString(trigger) && (trigger === 'click' || trigger === 'focus')) ||
      // we'd like to test array type trigger here, but the only case we need to cover is trigger === 'click' or
      // trigger === 'focus', because that when trigger is string
      // trigger.length === 1 and trigger[0] === 5 chars string is mutually exclusive.
      // so there will be no need to test if trigger is array type.
      (trigger.length === 1 && (trigger[0] === 'click' || trigger[0] === 'focus'));

    if (shouldPrevent) {
      return;
    }

    hide();
  }

  function initializePopper() {
    if (!unref(visibility)) {
      return;
    }
    const unwrappedTrigger = unref(triggerRef);
    const _trigger = isHTMLElement(unwrappedTrigger) ? unwrappedTrigger : (unwrappedTrigger as ComponentPublicInstance).$el;
    popperInstance = createPopper(_trigger, unref(popperRef as any), unref(popperOptions));

    popperInstance.update();
  }

  function doDestroy(forceDestroy?: boolean) {
    /* istanbul ignore if */
    if (!popperInstance || (unref(visibility) && !forceDestroy)) {
      return;
    }
    detachPopper();
  }

  function detachPopper() {
    popperInstance?.destroy?.();
    popperInstance = null;
  }

  const events = {} as PopperEvents;

  function update() {
    if (!unref(visibility)) {
      return;
    }
    if (popperInstance) {
      popperInstance.update();
    } else {
      initializePopper();
    }
  }

  function onVisibilityChange(toState: boolean) {
    if (toState) {
      popperStyle.value.zIndex = PopupManager.nextZIndex();
      if (popperInstance) {
        popperInstance.update();
      } else {
        initializePopper();
      }
    }
  }

  if (!isManualMode()) {
    const toggleState = () => {
      if (unref(visibility)) {
        hide();
      } else {
        show();
      }
    };

    const popperEventsHandler = (e: Event) => {
      e.stopPropagation();
      // eslint-disable-next-line default-case
      switch (e.type) {
        case 'click': {
          if (triggerFocused) {
            // reset previous focus event
            triggerFocused = false;
          } else {
            toggleState();
          }
          break;
        }
        case 'mouseenter': {
          show();
          break;
        }
        case 'mouseleave': {
          hide();
          break;
        }
        case 'focus': {
          triggerFocused = true;
          show();
          break;
        }
        case 'blur': {
          triggerFocused = false;
          hide();
          break;
        }
      }
    };

    const mapEvents = (t: TriggerType) => {
      (triggerEventsMap as any)[t].forEach((event: keyof PopperEvents) => {
        events[event] = popperEventsHandler;
      });
    };

    if (isArray(props.trigger)) {
      Object.values(props.trigger).forEach(mapEvents);
    } else {
      mapEvents(props.trigger as TriggerType);
    }
  }

  watch(popperOptions, (val) => {
    if (!popperInstance) {
      return;
    }
    popperInstance.setOptions(val);
    popperInstance.update();
  });

  watch(visibility, onVisibilityChange);

  return {
    update,
    doDestroy,
    show,
    hide,
    onPopperMouseEnter,
    onPopperMouseLeave,
    onAfterEnter: () => {
      emit('after-enter');
    },
    onAfterLeave: () => {
      detachPopper();
      emit('after-leave');
    },
    onBeforeEnter: () => {
      emit('before-enter');
    },
    onBeforeLeave: () => {
      emit('before-leave');
    },
    initializePopper,
    isManualMode,
    arrowRef,
    events,
    popperId,
    popperInstance,
    popperRef,
    popperStyle,
    triggerRef,
    visibility,
  };
};

export default usePopper;
