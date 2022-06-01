import { getCurrentInstance, computed } from 'vue';
import type { ComputedRef } from 'vue';
import { debugWarn, fromPairs } from '@fzui/utils';

interface Params {
  excludeListeners?: boolean;
  excludeKeys?: ComputedRef<string[]>;
}

const DEFAULT_EXCLUDE_KEYS = ['class', 'style'];
const LISTENER_PREFIX = /^on[A-Z]/;

/**
 * 除去某些属性或事件后的attrs，默认除去class和style，且一定包含两者
 * @param params Params
 * @returns attrs
 */
export const useAttrs = (params: Params = {}): ComputedRef<Record<string, unknown>> => {
  const { excludeListeners = false, excludeKeys } = params;
  const allExcludeKeys = computed<string[]>(() => {
    return (excludeKeys?.value || []).concat(DEFAULT_EXCLUDE_KEYS);
  });

  const instance = getCurrentInstance();
  if (!instance) {
    debugWarn('use-attrs', 'getCurrentInstance() returned null. useAttrs() must be called at the top of a setup function');
    return computed(() => ({}));
  }

  return computed(() =>
    fromPairs(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      Object.entries(instance.proxy?.$attrs!).filter(([key]) => !allExcludeKeys.value.includes(key) && !(excludeListeners && LISTENER_PREFIX.test(key))),
    ),
  );
};
