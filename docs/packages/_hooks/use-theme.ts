import { isClient, MaybeRef } from '@vueuse/core';
import { ref, unref } from 'vue';
import { useProp } from './use-prop';

export type Theme = 'light' | 'dark' | '';

export const useTheme = (fallback?: MaybeRef<Theme | undefined>) => {
  const propTheme = useProp<Theme>('theme');
  if (propTheme) {
    return propTheme;
  }
  const theme = ref<Theme>(unref(fallback) ?? 'light');
  if (isClient) {
    const isDarkTheme = window.matchMedia('(prefers-color-scheme: dark)');
    theme.value = isDarkTheme.matches ? 'dark' : 'light';
  }
  return theme;
};
