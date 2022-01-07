import { camelize, toRawType, isString, isObject, isFunction, isArray } from '@vue/shared';
import { isBoolean, isNumber } from '@vueuse/core';

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

export { isString, isObject, isArray, isFunction, isBoolean, isNumber, camelize };
