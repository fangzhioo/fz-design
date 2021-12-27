import { computed, ref, unref } from 'vue';
import type { MaybeRef } from '@vueuse/core';
import { useProp } from './use-prop';

export type ComponentSize = 'tiny' | 'small' | 'medium' | 'large';

export const useSize = (
  fallback?: MaybeRef<ComponentSize | '' | undefined>,
  ignore: Partial<
    Record<'prop' | 'form' | 'formItem' | 'global', boolean>
  > = {},
) => {
  const emptyRef = ref(undefined);

  const size = ignore.prop ? emptyRef : useProp<ComponentSize>('size');
  // TODO size by globalConfig and Form;
  // const globalConfig = ignore.global ? emptyRef : useGlobalConfig('size')
  // const globalConfigLegacy = ignore.global
  //   ? { size: undefined }
  //   : useGlobalConfigLegacy()
  // const form = ignore.form ? { size: undefined } : inject(elFormKey, undefined)
  // const formItem = ignore.formItem
  //   ? { size: undefined }
  //   : inject(elFormItemKey, undefined)

  return computed(
    () =>
      size.value ||
      unref(fallback) ||
      // formItem?.size ||
      // form?.size ||
      // globalConfig.value ||
      // globalConfigLegacy.size ||
      '',
  );
};
