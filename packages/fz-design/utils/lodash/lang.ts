export const isClient = typeof document !== 'undefined'

export const isFirefox = (): boolean =>
  isClient && /firefox/i.test(window.navigator.userAgent)

/**
 * 检测一个值是否为指定的类型
 *
 * @param { * } value 要检测的值
 * @param { string } type 预期类型
 * @returns { boolean } 这个值是否为传入的类型
 */
export const is = (value: unknown, type: string): boolean => {
  return Object.prototype.toString.call(value) === `[object ${type}]`
}

export const isBoolean = (val: unknown): boolean => is(val, 'Boolean')

export const isNumber = (val: unknown): val is number => is(val, 'Number')

export const isUndefined = (val: unknown): val is undefined => is(val, 'Undefined')

export const isMap = (val: unknown): val is Map<unknown, unknown> => is(val, 'Map')

export const isSet = (val: unknown): val is Set<unknown>  => is(val, 'Set')

export const isDate = (val: unknown): val is Date => is(val, 'Date')

export const isRegExp = (val: unknown): val is RegExp => is(val, 'RegExp')

export const isString = (val: unknown): val is string => is(val, 'String')

export const isSymbol = (val: unknown): val is Symbol => is(val, 'Symbol')

export const isObject = (val: unknown): val is Record<string | number | symbol, unknown> => is(val, 'Object')

export const isFunction = (val: unknown): boolean => typeof val === 'function'

export const isNull = (val: unknown): boolean => val === null

export const isNil = (val: unknown): val is any => isUndefined(val) || isNull(val)

export const hasOwn = (val: object, key: string | symbol): boolean =>
  Object.prototype.hasOwnProperty.call(val, key)

export const isArray = Array.isArray

export const isPromise = <T = unknown>(val: unknown): val is Promise<T> => {
  return (
    (isObject(val) || isFunction(val)) &&
    isFunction((val as any).then) &&
    isFunction((val as any).catch)
  )
}

export const isElement = (e: unknown): e is Element => {
  if (typeof Element === 'undefined') return false
  return e instanceof Element
}
