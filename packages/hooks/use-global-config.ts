import { App, computed, getCurrentInstance, inject, provide, ref, toRef, unref } from 'vue';
import type { Ref } from 'vue';
import { FZ_CONFIG_PROVIDER_INJECT_KEY } from '@fzui/constants';
import { ConfigProviderContext } from '@fzui/components/ConfigProvider/src/ConfigProvider';
import { MaybeRef } from '@vueuse/core';
import { debugWarn } from '@fzui/utils/error';
import { merge } from '@fzui/utils';

const globalConfig = ref<ConfigProviderContext>();

export function useGlobalConfig<K extends keyof ConfigProviderContext, D extends ConfigProviderContext[K]>(
  key: K,
  defaultValue?: D,
): Ref<Exclude<ConfigProviderContext[K], undefined> | D>;
// eslint-disable-next-line no-redeclare
export function useGlobalConfig(): Ref<ConfigProviderContext>;
// eslint-disable-next-line no-redeclare
export function useGlobalConfig(key?: keyof ConfigProviderContext, defaultValue = undefined) {
  const config = getCurrentInstance() ? inject(FZ_CONFIG_PROVIDER_INJECT_KEY, globalConfig) : globalConfig;
  if (key) {
    return computed(() => config.value?.[key] ?? defaultValue);
  }
  return config;
}

export const provideGlobalConfig = (config: MaybeRef<ConfigProviderContext>, app?: App, global = false) => {
  const inSetup = Boolean(getCurrentInstance());
  const oldConfig = inSetup ? useGlobalConfig() : undefined;

  const provideFn = app?.provide ?? (inSetup ? provide : undefined);
  if (!provideFn) {
    debugWarn('provideGlobalConfig', 'provideGlobalConfig() can only be used inside setup().');
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
  if (global || !globalConfig.value) {
    globalConfig.value = context.value;
  }
  return context;
};
