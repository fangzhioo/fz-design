import { getCurrentInstance, computed } from 'vue';
import type { ComputedRef } from 'vue';

export const useProp = <T>(name: string): ComputedRef<T | undefined> => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const vm = getCurrentInstance()!;
  const props = vm.proxy?.$props as Record<string, T>;
  return computed(() => props[name] ?? undefined);
};
