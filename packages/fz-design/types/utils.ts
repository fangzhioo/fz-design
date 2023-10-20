import type { Ref, CSSProperties, Plugin, ComputedRef } from 'vue';

// @vueuse/core 的 MaybeRef
export type MaybeRef<T> = Ref<T> | ComputedRef<T> | T;

type OptionalKeys<T extends Record<string, unknown>> = {
    [K in keyof T]: T extends Record<K, T[K]> ? never : K;
  }[keyof T];
  
  type RequiredKeys<T extends Record<string, unknown>> = Exclude<keyof T, OptionalKeys<T>>;
  
  type MonoArgEmitter<T, Keys extends keyof T> = <K extends Keys>(evt: K, arg?: T[K]) => void;
  
  type BiArgEmitter<T, Keys extends keyof T> = <K extends Keys>(evt: K, arg: T[K]) => void;
  
  export type EventEmitter<T extends Record<string, unknown>> = MonoArgEmitter<T, OptionalKeys<T>> & BiArgEmitter<T, RequiredKeys<T>>;
  
  export type AnyFunction<T = any> = (...args: any[]) => T;
  
  export type PartialReturnType<T extends (...args: unknown[]) => unknown> = Partial<ReturnType<T>>;
  
  export type SFCWithInstall<T> = T & Plugin;
  
  export type Nullable<T> = T | null;
  
  export type Arrayable<T> = T | T[];
  
  export type RefElement = Nullable<HTMLElement>;
  
  export type CustomizedHTMLElement<T> = HTMLElement & T;
  
  export type Indexable<T> = Record<string, T>;
  
  export type Hash<T> = Indexable<T>;
  
  export type TimeoutHandle = number;
  
  export type StyleValue = string | CSSProperties | StyleValue[];
  
  export type Mutable<T> = { -readonly [P in keyof T]: T[P] };
  
  export type ClassObjectType = Record<string, any>;
  
  export type ClassType = string | ClassObjectType | ClassType[];
