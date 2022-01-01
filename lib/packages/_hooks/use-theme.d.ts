import { MaybeRef } from '@vueuse/core';
export declare type Theme = 'light' | 'dark' | '';
export declare const useTheme: (fallback?: MaybeRef<Theme | undefined>) => import("vue").ComputedRef<Theme | undefined> | import("vue").Ref<Theme>;
