import type { ComputedRef} from 'vue';
import { computed, inject, ref, unref } from 'vue';
import { useProp } from './use-prop';
import { useGlobalConfig } from './use-global-config';
import { FZ_FORMITEM_INJECT_KEY, FZ_FORM_INJECT_KEY } from '../constants';
import type { MaybeRef, ComponentSize } from '../types';

export const useSize = (
  fallback?: MaybeRef<ComponentSize | '' | undefined>,
  ignore: Partial<Record<'prop' | 'form' | 'formItem' | 'global', boolean>> = {}
): ComputedRef<ComponentSize> => {
  const emptyRef = ref(undefined);

  const size = ignore.prop ? emptyRef : useProp<ComponentSize>('size');
  const globalConfigSize = ignore.global ? emptyRef : useGlobalConfig('size');
  const form = ignore.form ? { size: undefined } : inject(FZ_FORM_INJECT_KEY, undefined);
  const formItem = ignore.formItem ? { size: undefined } : inject(FZ_FORMITEM_INJECT_KEY, undefined);

  return computed(
    () =>
      size.value ||
      unref(fallback) ||
      formItem?.size ||
      form?.size ||
      globalConfigSize.value ||
      'medium'
  );
};
