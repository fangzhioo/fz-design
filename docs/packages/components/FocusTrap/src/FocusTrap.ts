import { ExtractPropTypes, PropType, Ref } from 'vue';
import type FocusTrap from './FocusTrap.vue';
import { ON_RELEASE_FOCUS_EVT, ON_TRAP_FOCUS_EVT } from './utils';

export const FOCUS_AFTER_TRAPPED = 'focus-trap.focus-after-trapped';
export const FOCUS_AFTER_RELEASED = 'focus-trap.focus-after-released';
export const FOCUS_AFTER_TRAPPED_OPTS: EventInit = {
  cancelable: true,
  bubbles: false,
};

export type FocusTrapInjectionContext = {
  focusTrapRef: Ref<HTMLElement | undefined>;
  onKeydown: (e: KeyboardEvent) => void;
};

export const focusTrapProps = {
  loop: Boolean,
  trapped: Boolean,
  focusTrapEl: Object as PropType<HTMLElement>,
  focusStartEl: {
    type: [Object, String] as PropType<'container' | 'first' | HTMLElement>,
    default: 'first',
  },
};

export const focusTrapEmits = [ON_TRAP_FOCUS_EVT, ON_RELEASE_FOCUS_EVT, 'focusin', 'focusout', 'focusout-prevented', 'release-requested'];

export type FocusTrapProps = ExtractPropTypes<typeof focusTrapProps>;
export type FocusTrapEmits = typeof focusTrapEmits;
export type FocusTrapInstance = InstanceType<typeof FocusTrap>;
