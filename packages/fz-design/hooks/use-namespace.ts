import type { StyleValue } from 'vue'

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

export interface Ns {
  namespace: string,
  /** 组件名称 */
  getName: () => string,
  b: (blockSuffix?: string) => string,
  e: (element?: string) => string,
  m: (modifier?: string) => string,
  be: (blockSuffix?: string, element?: string) => string,
  em: (element?: string, modifier?: string) => string,
  bm: (blockSuffix?: string, modifier?: string) => string,
  bem: (blockSuffix?: string, element?: string, modifier?: string) => string,
  is: {
    (name: string, state: boolean | undefined): string
    (name: string): string
  }
  // css
  cssVar: (object: Record<string, string>) => StyleValue
  cssVarName: (name: string) => string
  cssVarBlock: (object: Record<string, string>) => StyleValue
  cssVarBlockName: (name: string) => string
}

export const useNamespace = (block: string): Ns => {
  const namespace = defaultNamespace
  const b = (blockSuffix = ''): string => _bem(namespace, block, blockSuffix, '', '')
  const e = (element?: string): string =>
    element ? _bem(namespace, block, '', element, '') : ''
  const m = (modifier?: string): string =>
    modifier ? _bem(namespace, block, '', '', modifier) : ''
  const be = (blockSuffix?: string, element?: string): string =>
    blockSuffix && element ? _bem(namespace, block, blockSuffix, element, '') : ''
  const em = (element?: string, modifier?: string): string =>
    element && modifier ? _bem(namespace, block, '', element, modifier) : ''
  const bm = (blockSuffix?: string, modifier?: string): string =>
    blockSuffix && modifier ? _bem(namespace, block, blockSuffix, '', modifier) : ''
  const bem = (blockSuffix?: string, element?: string, modifier?: string): string =>
    blockSuffix && element && modifier
      ? _bem(namespace, block, blockSuffix, element, modifier)
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
        styles[`--${namespace}-${key}`] = object[key]
      }
    }
    return styles
  }
  // with block
  const cssVarBlock = (object: Record<string, string>): StyleValue => {
    const styles: Record<string, string> = {}
    for (const key in object) {
      if (object[key]) {
        styles[`--${namespace}-${block}-${key}`] = object[key]
      }
    }
    return styles
  }

  const cssVarName = (name: string): string => `--${namespace}-${name}`
  const cssVarBlockName = (name: string): string => `--${namespace}-${block}-${name}`

  const getName = (): string => {
    return `${b()}`.toLowerCase()
    .replace(/( |^)[a-z]/g, L => L.toUpperCase())
    .replace(/(\-([a-z]))/g, (match, p1, p2) => {
      // 这里有两个捕获组，第一个捕获组捕获全部并包含了第二个捕获组，所以match等于p1
      return p2.toUpperCase()
    })
  }

  return {
    namespace,
    /** 组件名称 */
    getName,
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
