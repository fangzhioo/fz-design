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

/**
 * @vue/shared 的 camelize 方法
 * Camelize a hyphen-delimited string.
 */
export const camelize = (str: string): string => {
  const camelizeRE = /-(\w)/g
  return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ''))
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
