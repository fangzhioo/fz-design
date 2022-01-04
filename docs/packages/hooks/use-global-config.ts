import { inject, toRef } from 'vue';
import type { Ref } from 'vue';
import { FZ_CONFIG_PROVIDER_INJECT_KEY } from 'packages/utils/constants';
import { ConfigProviderContext } from 'packages/components/ConfigProvider/src/ConfigProvider';

export function useGlobalConfig<K extends keyof ConfigProviderContext>(key: K): Ref<ConfigProviderContext[K]>;
// eslint-disable-next-line no-redeclare
export function useGlobalConfig(): ConfigProviderContext;

// eslint-disable-next-line no-redeclare
export function useGlobalConfig(key?: keyof ConfigProviderContext) {
  const config = inject<ConfigProviderContext>(FZ_CONFIG_PROVIDER_INJECT_KEY, {} as ConfigProviderContext);
  if (key) {
    return toRef(config, key);
  }
  return config;
}
