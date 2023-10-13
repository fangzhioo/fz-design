import { provide } from 'vue';
import { FZ_FORWARD_REF_INJECT_KEY } from '../constants';

import type { Ref } from 'vue';

type ForwardRefSetter = <T>(el: T) => void;

export type ForwardRefInjectionContext = {
  setForwardRef: ForwardRefSetter;
};

export const useForwardRef = <T>(forwardRef: Ref<T | null>) => {
  const setForwardRef = (el: T) => {
    forwardRef.value = el;
  };

  provide(FZ_FORWARD_REF_INJECT_KEY, {
    setForwardRef,
  });
};

export const useForwardRefDirective = <T>(setForwardRef: ForwardRefSetter) => {
  return {
    mounted(el: T) {
      setForwardRef(el);
    },
    updated(el: T) {
      setForwardRef(el);
    },
    unmounted() {
      setForwardRef(null);
    },
  };
};
