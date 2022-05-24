import { camelize, toRawType, isString, isObject, isFunction, isArray, isPromise, hasOwn } from '@vue/shared';
import { isBoolean, isNumber, isClient } from '@vueuse/core';
import { debugWarn } from './error';

/**
 * 返回0到n-1的数字数组
 * @param n 取数组
 * @returns [0, 1, 2..., n-1]
 */
export const rangeArr = (n: number) => Array.from(Array(n).keys());

export function isKorean(text: string): boolean {
  const reg = /([(\uAC00-\uD7AF)|(\u3130-\u318F)])+/gi;
  return reg.test(text);
}

export const isHTMLElement = (val: unknown) => toRawType(val).startsWith('HTML');

/**
 * Generate uuid
 * @returns uuid
 */
export const generateUUID = (): string => {
  let dt = new Date().getTime();
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    // eslint-disable-next-line no-bitwise
    const r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    // eslint-disable-next-line no-bitwise
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
  return uuid;
};

/**
 * 处理自动带上单位 px
 * @param value string/number
 * @returns 带单位的字符串
 */
export function addUnit(value: string | number) {
  if (isString(value)) {
    return value;
  } else if (isNumber(value)) {
    return `${value}px`;
  }
  debugWarn('addUnit', 'binding value must be a string or number');
  return '';
}

/**
 * 合并对象
 * @param a 对象a
 * @param b 对象b
 * @returns 合并后的对象
 */
export const merge = <T extends Record<string, any>>(a: T, b: T) => {
  const keys = [...new Set([...Object.keys(a), ...Object.keys(b)])] as (keyof T)[];
  const obj = {} as T;
  for (const key of keys) {
    obj[key] = b[key] ?? a[key];
  }
  return obj;
};

/**
 * 转义正则表达式字符串
 * @param value 字符串
 * @returns 转义后字符串
 */
export const escapeRegexpString = (value = ''): string => String(value).replace(/[|\\{}()[\]^$+*?.]/g, '\\$&');

// like _.castArray
export const castArray = (arr: any): any[] => {
  if (!arr && arr !== 0) return [];
  return isArray(arr) ? arr : [arr];
};

export const isUndefined = (val: any): val is undefined => val === undefined;

export const isEmpty = (val: unknown) => (!val && val !== 0) || (isArray(val) && val.length === 0) || (isObject(val) && !Object.keys(val).length);

export { isClient, isString, isObject, isArray, isPromise, isFunction, isBoolean, isNumber, camelize, hasOwn };
