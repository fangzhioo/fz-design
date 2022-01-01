import { MaybeRef } from '@vueuse/core';
import { computed, unref } from 'vue';
import { useForm } from './use-form';
import { useProp } from './use-prop';

export const useDisabled = (fallback?: MaybeRef<boolean | undefined>) => {
  const disabled = useProp<boolean>('disabled');
  const { form } = useForm();
  return computed(
    () => disabled.value || unref(fallback) || form?.disabled || false,
  );
};
