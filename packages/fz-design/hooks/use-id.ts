import { computed, inject, unref } from 'vue';
import { warning, isClient } from '../utils';

import type { InjectionKey, Ref } from 'vue';
import type { MaybeRef } from '../types';

export type FzIdInjectionContext = {
  prefix: number;
  current: number;
};

const defaultIdInjection = {
  prefix: Math.floor(Math.random() * 10000),
  current: 0,
};

export const ID_INJECTION_KEY: InjectionKey<FzIdInjectionContext> = Symbol('fzIdInjection');

export const useId = (deterministicId?: MaybeRef<string>): Ref<string> => {
  const idInjection = inject(ID_INJECTION_KEY, defaultIdInjection);

  if (!isClient && idInjection === defaultIdInjection) {
    warning(
      'IdInjection',
      `Looks like you are using server rendering, you must provide a id provider to ensure the hydration process to be succeed
usage: app.provide(ID_INJECTION_KEY, {
  prefix: number,
  current: number,
})`,
    );
  }

  const idRef = computed(() => unref(deterministicId) || `fz-id-${idInjection.prefix}-${idInjection.current++}`);

  return idRef;
};
