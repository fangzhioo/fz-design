import { computed, getCurrentInstance, inject, ref, unref } from 'vue'

import type { InjectionKey, Ref, StyleValue } from 'vue'

export const defaultNamespace = 'fz'
const statePrefix = 'is-'

const _bem = (
  namespace: string,
  block: string,
  blockSuffix: string,
  element: string,
  modifier: string
): string => {
  let cls = `${namespace}-${block}`
  if (blockSuffix) {
    cls += `-${blockSuffix}`
  }
  if (element) {
    cls += `__${element}`
  }
  if (modifier) {
    cls += `--${modifier}`
  }
  return cls
}

export const namespaceContextKey: InjectionKey<Ref<string | undefined>> =
  Symbol('namespaceContextKey')

export const useGetDerivedNamespace = (
  namespaceOverrides?: Ref<string | undefined>
): Ref<string> => {
  const derivedNamespace =
    namespaceOverrides ||
    (getCurrentInstance()
      ? inject(namespaceContextKey, ref(defaultNamespace))
      : ref(defaultNamespace))
  const namespace = computed(() => {
    return unref(derivedNamespace) || defaultNamespace
  })
  return namespace
}

export const useNamespace = (
  block: string,
  namespaceOverrides?: Ref<string | undefined>
): any => {
  const namespace = useGetDerivedNamespace(namespaceOverrides)
  const b = (blockSuffix = ''): string =>
    _bem(namespace.value, block, blockSuffix, '', '')
  const e = (element?: string): string =>
    element ? _bem(namespace.value, block, '', element, '') : ''
  const m = (modifier?: string): string =>
    modifier ? _bem(namespace.value, block, '', '', modifier) : ''
  const be = (blockSuffix?: string, element?: string): string =>
    blockSuffix && element ? _bem(namespace.value, block, blockSuffix, element, '') : ''
  const em = (element?: string, modifier?: string): string =>
    element && modifier ? _bem(namespace.value, block, '', element, modifier) : ''
  const bm = (blockSuffix?: string, modifier?: string): string =>
    blockSuffix && modifier ? _bem(namespace.value, block, blockSuffix, '', modifier) : ''
  const bem = (blockSuffix?: string, element?: string, modifier?: string): string =>
    blockSuffix && element && modifier
      ? _bem(namespace.value, block, blockSuffix, element, modifier)
      : ''
  const is: {
    (name: string, state: boolean | undefined): string
    (name: string): string
  } = (name: string, ...args: [boolean | undefined] | []) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const state = args.length >= 1 ? args[0]! : true
    return name && state ? `${statePrefix}${name}` : ''
  }

  // for css var
  // --el-xxx: value;
  const cssVar = (object: Record<string, string>): StyleValue => {
    const styles: Record<string, string> = {}
    for (const key in object) {
      if (object[key]) {
        styles[`--${namespace.value}-${key}`] = object[key]
      }
    }
    return styles
  }
  // with block
  const cssVarBlock = (object: Record<string, string>): StyleValue => {
    const styles: Record<string, string> = {}
    for (const key in object) {
      if (object[key]) {
        styles[`--${namespace.value}-${block}-${key}`] = object[key]
      }
    }
    return styles
  }

  const cssVarName = (name: string): string => `--${namespace.value}-${name}`
  const cssVarBlockName = (name: string): string =>
    `--${namespace.value}-${block}-${name}`

  return {
    namespace,
    b,
    e,
    m,
    be,
    em,
    bm,
    bem,
    is,
    // css
    cssVar,
    cssVarName,
    cssVarBlock,
    cssVarBlockName
  }
}

export type UseNamespaceReturn = ReturnType<typeof useNamespace>
