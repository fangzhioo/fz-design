import type { ComputedRef, Ref} from 'vue';
import { computed, inject, ref, unref } from 'vue';
import { useProp } from './use-prop';
import { useGlobalConfig } from './use-global-config';
import { FZ_FORM_ITEM_INJECT_KEY, FZ_FORM_INJECT_KEY, FZ_SIZE_INJECTION_KEY } from '../constants';
import type { MaybeRef, ComponentSize } from '../types';

export const useSize = (
  fallback?: MaybeRef<ComponentSize | '' | undefined>,
  ignore: Partial<Record<'prop' | 'form' | 'formItem' | 'global', boolean>> = {}
): ComputedRef<ComponentSize> => {
  const emptyRef = ref(undefined);

  const size = ignore.prop ? emptyRef : useProp<ComponentSize>('size');
  const globalConfigSize = ignore.global ? emptyRef : useGlobalConfig('size');
  const form = ignore.form ? { size: undefined } : inject(FZ_FORM_INJECT_KEY, undefined);
  const formItem = ignore.formItem ? { size: undefined } : inject(FZ_FORM_ITEM_INJECT_KEY, undefined);

  return computed(
    () =>
      size.value ||
      unref(fallback) ||
      formItem?.size ||
      form?.size ||
      globalConfigSize.value ||
      'default'
  );
};

export interface SizeContext {
  size: Ref<ComponentSize>
}

export const useGlobalSize = (): ComputedRef<ComponentSize> => {
  const injectedSize = inject(FZ_SIZE_INJECTION_KEY, {} as SizeContext)

  return computed<ComponentSize>(() => {
    return unref(injectedSize.size) || ''
  })
}
