import { camelize } from '@vue/shared';

export { isString, isObject, isBoolean, isFunction, isNumber } from '@vueuse/core';

export function isKorean(text: string): boolean {
  const reg = /([(\uAC00-\uD7AF)|(\u3130-\u318F)])+/gi;
  return reg.test(text);
}

export { camelize };
