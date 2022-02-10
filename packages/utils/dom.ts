/* eslint-disable no-param-reassign */
import { isClient } from '@vueuse/core';
import { camelize } from '.';
import { Nullable } from './types';

/* istanbul ignore next */
const trimArr = function (s: string) {
  return (s || '').split(' ').filter((item) => Boolean(item.trim()));
};

/* istanbul ignore next */
export const on = function (element: HTMLElement | Document | Window, event: string, handler: (args: any) => void, useCapture = false): void {
  if (element && event && handler) {
    element?.addEventListener(event, handler, useCapture);
  }
};

export const stop = (e: Event) => e.stopPropagation();

/* istanbul ignore next */
// Here I want to use the type CSSProperties, but the definition for CSSProperties
// has { [index: number]: string } in its type annotation, which does not satisfy the method
// camelize(s: string)
// Same as the return type
export const getStyle = function (element: HTMLElement, styleName: any): string {
  if (!isClient) {
    return '';
  }
  if (!element || !styleName) {
    return '';
  }
  styleName = camelize(styleName);
  if (styleName === 'float') {
    styleName = 'cssFloat';
  }
  try {
    const style = element.style[styleName];
    if (style) {
      return style;
    }
    const computed = document.defaultView?.getComputedStyle(element, '');
    return computed ? computed[styleName] : '';
  } catch (e) {
    return element.style[styleName];
  }
};

export const isScroll = (el: HTMLElement, isVertical?: Nullable<boolean>): RegExpMatchArray | null => {
  if (!isClient) {
    return null;
  }
  const determinedDirection = isVertical === null || isVertical === undefined;
  // eslint-disable-next-line no-nested-ternary
  const overflow = determinedDirection ? getStyle(el, 'overflow') : isVertical ? getStyle(el, 'overflow-y') : getStyle(el, 'overflow-x');

  return overflow.match(/(scroll|auto|overlay)/);
};

export const getScrollContainer = (el: HTMLElement, isVertical?: Nullable<boolean>): HTMLElement | undefined => {
  if (!isClient) {
    return;
  }
  // 一直向上寻找顶层有进度条的父元素
  let parent: HTMLElement = el;
  while (parent) {
    if ([window, document, document.documentElement].includes(parent)) {
      return document.documentElement;
    }
    if (isScroll(parent, isVertical)) {
      return parent;
    }
    parent = parent.parentNode as HTMLElement;
  }
  return parent;
};

/* istanbul ignore next */
export function addClass(el: HTMLElement | Element, cls: string): void {
  if (!el) {
    return;
  }
  let className = el.getAttribute('class') || '';
  const curClass = trimArr(className);
  const classes = (cls || '').split(' ').filter((item) => !curClass.includes(item) && Boolean(item.trim()));

  if (el.classList) {
    el.classList.add(...classes);
  } else {
    className += ` ${classes.join(' ')}`;
    el.setAttribute('class', className);
  }
}

/* istanbul ignore next */
export function removeClass(el: HTMLElement | Element, cls: string): void {
  if (!el || !cls) {
    return;
  }
  const classes = trimArr(cls);
  let curClass = el.getAttribute('class') || '';

  if (el.classList) {
    el.classList.remove(...classes);
    return;
  }
  classes.forEach((item) => {
    curClass = curClass.replace(` ${item} `, ' ');
  });
  const className = trimArr(curClass).join(' ');
  el.setAttribute('class', className);
}
