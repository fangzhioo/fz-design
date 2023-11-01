export const isClient = typeof document !== 'undefined'

export const isFirefox = (): boolean =>
  isClient && /firefox/i.test(window.navigator.userAgent)

export const isBoolean = (val: any): boolean =>
  Object.prototype.toString.call(val) === '[object Boolean]'

export const isNumber = (val: any): boolean =>
  Object.prototype.toString.call(val) === '[object Number]'

export const isUndefined = (val: any): boolean =>
  Object.prototype.toString.call(val) === '[object Undefined]'

export const isNull = (val: any): boolean => val === null

export const isNil = (val: any): boolean => isUndefined(val) || isNull(val)

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

export const isString = (val: any): boolean =>
  Object.prototype.toString.call(val) === '[object String]'
export const isSymbol = (val: any): boolean =>
  Object.prototype.toString.call(val) === '[object Symbol]'
export const isObject = (val: unknown): val is Record<any, any> =>
  val !== null && typeof val === 'object'

export const isPromise = <T = any>(val: unknown): val is Promise<T> => {
  return (
    (isObject(val) || isFunction(val)) &&
    isFunction((val as any).then) &&
    isFunction((val as any).catch)
  )
}

export const isEmpty = (val: any): boolean => isUndefined(val) || val === null

export const isElement = (e: unknown): e is Element => {
  if (typeof Element === 'undefined') return false
  return e instanceof Element
}
