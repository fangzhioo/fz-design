import { camelize, toRawType, isString, isObject, isFunction, isArray } from '@vue/shared';
import { isBoolean, isNumber } from '@vueuse/core';
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

export const merge = <T extends Record<string, any>>(a: T, b: T) => {
  const keys = [...new Set([...Object.keys(a), ...Object.keys(b)])] as (keyof T)[];
  const obj = {} as T;
  for (const key of keys) {
    obj[key] = b[key] ?? a[key];
  }
  return obj;
};

export { isString, isObject, isArray, isFunction, isBoolean, isNumber, camelize };
