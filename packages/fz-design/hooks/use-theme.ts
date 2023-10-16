import { ref, unref, watch } from 'vue';
import { useProp } from './use-prop';
import { addClass, hasClass, isClient, removeClass } from '../utils';

import type { Ref} from 'vue';
import type { MaybeRef } from '../types';

export type Theme = 'light' | 'dark' | '';

const darkClazz = 'dark';
const lightClazz = 'light';

export const useTheme = (fallback?: MaybeRef<Theme | undefined>): Ref<Theme> => {
  const theme = ref<Theme>(unref(fallback) ?? '');
  if (isClient) {
    const isDarkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches || hasClass(document.documentElement, darkClazz);
    theme.value = isDarkTheme ? 'dark' : 'light';
  }
  const propTheme = useProp<Theme>('theme');
  if (propTheme.value) {
    theme.value = propTheme.value;
  }
  if (isClient) {
    watch(theme, () => {
      if (theme.value) {
        // mode for fz-design
        document.documentElement.setAttribute('data-mode', theme.value);
        // class for vitepress
        addClass(document.documentElement,theme.value === 'dark' ? darkClazz : lightClazz)
        removeClass(document.documentElement,theme.value === 'dark' ? lightClazz : darkClazz)
      }
    });
  }
  return theme;
};
