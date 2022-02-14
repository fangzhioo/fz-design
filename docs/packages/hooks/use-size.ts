import { computed, inject, ref, unref } from 'vue';
import type { MaybeRef } from '@vueuse/core';
import { useProp } from './use-prop';
import { useGlobalConfig } from './use-global-config';
import { FZ_FORMITEM_INJECT_KEY, FZ_FORM_INJECT_KEY } from '@fzui/constants';

export type ComponentSize = 'mini' | 'small' | 'medium' | 'large';

export const useSize = (
  fallback?: MaybeRef<ComponentSize | '' | undefined>,
  ignore: Partial<Record<'prop' | 'form' | 'formItem' | 'global', boolean>> = {},
) => {
  const emptyRef = ref(undefined);

  const size = ignore.prop ? emptyRef : useProp<ComponentSize>('size');
  // TODO size by globalConfig and Form;
  const globalConfigSize = ignore.global ? emptyRef : useGlobalConfig('size');
  // const globalConfigLegacy = ignore.global
  //   ? { size: undefined }
  //   : useGlobalConfigLegacy()
  const form = ignore.form ? { size: undefined } : inject(FZ_FORM_INJECT_KEY, undefined);
  const formItem = ignore.formItem ? { size: undefined } : inject(FZ_FORMITEM_INJECT_KEY, undefined);

  return computed(
    () =>
      size.value ||
      unref(fallback) ||
      formItem?.size ||
      form?.size ||
      globalConfigSize.value ||
      // globalConfigLegacy.size ||
      '',
  );
};
