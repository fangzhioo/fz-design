import type { MaybeRef } from '@vueuse/core';
export declare type ComponentSize = 'mini' | 'small' | 'medium' | 'large';
export declare const useSize: (fallback?: MaybeRef<ComponentSize | '' | undefined>, ignore?: Partial<Record<'prop' | 'form' | 'formItem' | 'global', boolean>>) => import("vue").ComputedRef<"" | ComponentSize>;
