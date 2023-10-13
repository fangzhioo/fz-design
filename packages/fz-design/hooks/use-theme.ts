
import { ref, unref, watch } from 'vue';
import { useProp } from './use-prop';
import { MaybeRef } from '../types';
import { isClient } from '../utils';

export type Theme = 'light' | 'dark' | '';

export const useTheme = (fallback?: MaybeRef<Theme | undefined>) => {
  const theme = ref<Theme>(unref(fallback) ?? 'light');
  if (isClient) {
    const isDarkTheme = window.matchMedia('(prefers-color-scheme: dark)');
    theme.value = isDarkTheme.matches ? 'dark' : 'light';
  }
  const propTheme = useProp<Theme>('theme');
  if (propTheme.value) {
    theme.value = propTheme.value;
  }
  if (isClient) {
    watch(theme, () => {
      if (theme.value) {
        document.documentElement.setAttribute('data-mode', theme.value);
      }
    });
  }
  return theme;
};
