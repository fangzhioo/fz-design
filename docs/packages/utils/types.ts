import type { Plugin } from 'vue';

export type Nullable<T> = T | null;
export type TimeoutHandle = number;
export type SFCWithInstall<T> = T & Plugin;
export type AnyFunction<T = any> = (...args: any[]) => T;
