import { isClient, MaybeRef } from '@vueuse/core';
import { ref, unref, watch } from 'vue';

export type Theme = 'light' | 'dark' | '';

export const useTheme = (fallback?: MaybeRef<Theme | undefined>) => {
  const theme = ref<Theme>(unref(fallback) ?? 'light');
  if (isClient) {
    const isDarkTheme = window.matchMedia('(prefers-color-scheme: dark)');
    theme.value = isDarkTheme.matches ? 'dark' : 'light';
  }

  watch(theme, () => {
    if (theme.value) {
      document.documentElement.setAttribute('data-mode', theme.value);
    }
  });

  const setTheme = (a: Theme) => {
    theme.value = a;
  };

  return {
    theme,
    setTheme,
  };
};
