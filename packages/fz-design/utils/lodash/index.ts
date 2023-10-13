/**
 * lodash的get方法
 * @param source obj
 * @param path path
 * @param defaultValue 默认值
 * @returns 值
 */
export const get = (source: any, path: string, defaultValue: any): any => {
  
  // 将数组格式的路径转化成dot格式的，再拆分成key数组
  // a[0].b -> a.0.b -> ['a', '0', 'b']
  const paths = path.replace(/\[(\d+)\]/g, '.$1').split('.')
  let result = source
  for (const p of paths) {   
    result = result?.[p]
    if (result === undefined || result === null) {
       return defaultValue
    }
  }
  
  return result || defaultValue
}

/**
 * The inverse of `toPairs`is method returns an object composed
 * from key-value `pairs`.
 *
 * @since 4.0.0
 * @category Array
 * @param {Array} pairs The key-value pairs.
 * @returns {Object} Returns the new object.
 * @example
 *
 * fromPairs([['a', 1], ['b', 2]])
 * // => { 'a': 1, 'b': 2 }
 */
export const fromPairs = (pairs: [string, any][]): Record<string, any> => {
  const result: Record<string, any> = {}
  if (pairs == null) {
    return result
  }
  for (const pair of pairs) {
    result[pair[0]] = pair[1]
  }
  return result
}

export const isClient = typeof document !== 'undefined'

/**
 * @vue/shared 的 camelize 方法
 * Camelize a hyphen-delimited string.
 */
export const camelize = (str: string): string => {
  const camelizeRE = /-(\w)/g
  return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ''))
}

export const isFirefox = (): boolean =>
  isClient && /firefox/i.test(window.navigator.userAgent)

export const isBoolean = (val: any): boolean =>
  Object.prototype.toString.call(val) === '[object Boolean]'

export const isNumber = (val: any): boolean =>
  Object.prototype.toString.call(val) === '[object Number]'

export const hasOwn = (val: object, key: string | symbol): key is keyof typeof val =>
  Object.prototype.hasOwnProperty.call(val, key)

export const isArray = Array.isArray

export const isMap = (val: unknown): val is Map<any, any> =>
  Object.prototype.toString.call(val) === '[object Map]'

export const isSet = (val: unknown): val is Set<any> =>
  Object.prototype.toString.call(val) === '[object Set]'

export const isDate = (val: unknown): val is Date =>
  Object.prototype.toString.call(val) === '[object Date]'

export const isRegExp = (val: unknown): val is RegExp =>
  Object.prototype.toString.call(val) === '[object RegExp]'

export const isFunction = (val: unknown): val is Function => typeof val === 'function'

export const isString = (val: any): boolean=>  Object.prototype.toString.call(val) === '[object String]'
export const isSymbol = (val: any): boolean => Object.prototype.toString.call(val) === '[object Symbol]'
export const isObject = (val: unknown): val is Record<any, any> =>
  val !== null && typeof val === 'object'

export const isPromise = <T = any>(val: unknown): val is Promise<T> => {
  return (
    (isObject(val) || isFunction(val)) &&
    isFunction((val as any).then) &&
    isFunction((val as any).catch)
  )
}

/**
 * 合并对象
 * @param a 对象a
 * @param b 对象b
 * @returns 合并后的对象
 */
export const merge = <T extends Record<string, any>>(a: T, b: T): T => {
  const keys = [...new Set([...Object.keys(a), ...Object.keys(b)])] as (keyof T)[]
  const obj = {} as T
  for (const key of keys) {
    obj[key] = b[key] ?? a[key]
  }
  return obj
}

/**
 * Generate uuid
 * @returns uuid
 */
export const generateUUID = (): string => {
  let dt = new Date().getTime()
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    // eslint-disable-next-line no-bitwise
    const r = (dt + Math.random() * 16) % 16 | 0
    dt = Math.floor(dt / 16)
    // eslint-disable-next-line no-bitwise
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
  })
  return uuid
}
