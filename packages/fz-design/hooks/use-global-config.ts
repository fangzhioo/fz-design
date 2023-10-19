import { computed, getCurrentInstance, inject, provide, ref, unref } from 'vue';
import { merge, warning } from '../utils';
import { FZ_CONFIG_PROVIDER_INJECT_KEY, FZ_LOCALE_INJECT_KEY, FZ_SIZE_INJECTION_KEY, FZ_THEME_INJECT_KEY, FZ_Z_INDEX_INJECTION_KEY } from '../constants';
import type { ConfigProviderProps as ConfigProviderContext } from '../components/config-provider';
import type { MaybeRef } from '../types';
import type { Ref , App} from 'vue';

const globalConfig = ref<ConfigProviderContext>();

export function useGlobalConfig<K extends keyof ConfigProviderContext, D extends ConfigProviderContext[K]>(
  key: K,
  defaultValue?: D,
): Ref<Exclude<ConfigProviderContext[K], undefined> | D>;
// eslint-disable-next-line no-redeclare
export function useGlobalConfig(): Ref<ConfigProviderContext>;
// eslint-disable-next-line no-redeclare
export function useGlobalConfig (key?: keyof ConfigProviderContext, defaultValue = undefined): Ref<ConfigProviderContext[keyof ConfigProviderContext] | ConfigProviderContext | undefined> {
  const config = getCurrentInstance() ? inject(FZ_CONFIG_PROVIDER_INJECT_KEY, globalConfig) : globalConfig;
  if (key) {
    return computed(() => config.value?.[key] ?? defaultValue);
  }
  return config;
}

export const provideGlobalConfig = (config: MaybeRef<ConfigProviderContext>, app?: App, global = false): Ref<ConfigProviderContext> | undefined => {
  const inSetup = Boolean(getCurrentInstance());
  const oldConfig = inSetup ? useGlobalConfig() : undefined;

  const provideFn: any = app?.provide ?? (inSetup ? provide : undefined);
  if (!provideFn) {
    warning('provideGlobalConfig', 'provideGlobalConfig() can only be used inside setup().');
    return;
  }

  const context = computed(() => {
    const cfg = unref(config);
    if (!oldConfig?.value) {
      return cfg;
    }
    return merge(oldConfig.value, cfg);
  });
  
  provideFn(FZ_CONFIG_PROVIDER_INJECT_KEY, context);

  provideFn(
    FZ_LOCALE_INJECT_KEY,
    computed(() => context.value.locale)
  )

  provideFn(
    FZ_Z_INDEX_INJECTION_KEY,
    computed(() => context.value.zIndex)
  )

  provideFn(
    FZ_THEME_INJECT_KEY,
    computed(() => context.value.theme)
  )

  provideFn(FZ_SIZE_INJECTION_KEY, {
    size: computed(() => context.value.size || '')
  })

  if (global || !globalConfig.value) {
    globalConfig.value = context.value;
  }
  return context;
};
