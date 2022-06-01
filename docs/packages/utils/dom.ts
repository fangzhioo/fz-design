/* eslint-disable no-param-reassign */
import { camelize, isClient } from '.';
import { Nullable } from './types';

const trimArr = (s: string) => (s || '').split(' ').filter((item) => Boolean(item.trim()));

export const on = (element: HTMLElement | Document | Window, event: string, handler: (args: any) => void, useCapture = false): void => {
  if (element && event && handler) {
    element?.addEventListener(event, handler, useCapture);
  }
};

export const off = (element: HTMLElement | Document | Window, event: string, handler: (args: any) => void, useCapture = false): void => {
  if (element && event && handler) {
    element?.removeEventListener(event, handler, useCapture);
  }
};

export const stop = (e: Event) => e.stopPropagation();

/* istanbul ignore next */
// Here I want to use the type CSSProperties, but the definition for CSSProperties
// has { [index: number]: string } in its type annotation, which does not satisfy the method
// camelize(s: string)
// Same as the return type
export const getStyle = (element: HTMLElement, styleName: any): string => {
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

// export const isScroll = (el: HTMLElement, isVertical?: Nullable<boolean>): RegExpMatchArray | null => {
//   if (!isClient) {
//     return null;
//   }
//   const determinedDirection = isVertical === null || isVertical === undefined;
//   // eslint-disable-next-line no-nested-ternary
//   const overflow = determinedDirection ? getStyle(el, 'overflow') : isVertical ? getStyle(el, 'overflow-y') : getStyle(el, 'overflow-x');

//   return overflow.match(/(scroll|auto|overlay)/);
// };

export const isScroll = (el: HTMLElement, isVertical?: boolean): boolean => {
  if (!isClient) return false;
  const key = {
    undefined: 'overflow',
    true: 'overflow-y',
    false: 'overflow-x',
  }[String(isVertical)]!;
  const overflow = getStyle(el, key);
  return ['scroll', 'auto', 'overlay'].some((s) => overflow.includes(s));
};

export const getScrollContainer = (el: HTMLElement, isVertical?: boolean): HTMLElement | undefined => {
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

export const hasClass = (el: Element, cls: string): boolean => {
  if (!el || !cls) {
    return false;
  }
  if (cls.includes(' ')) {
    throw new Error('className should not contain space.');
  }
  return el.classList.contains(cls);
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

export const composeEventHandlers = <E>(
  theirsHandler?: (event: E) => boolean | void,
  oursHandler?: (event: E) => void,
  { checkForDefaultPrevented = true } = {},
) => {
  const handleEvent = (event: E) => {
    const shouldPrevent = theirsHandler?.(event);

    if (checkForDefaultPrevented === false || !shouldPrevent) {
      return oursHandler?.(event);
    }
  };
  return handleEvent;
};

/**
 * 使容器滚动到目标元素位置
 * @param container 容器
 * @param selected 目标点
 * @returns
 */
export function scrollIntoView(container: HTMLElement, selected: HTMLElement): void {
  if (!isClient) {
    return;
  }

  if (!selected) {
    container.scrollTop = 0;
    return;
  }

  const offsetParents: HTMLElement[] = [];
  let pointer = selected.offsetParent as HTMLElement;
  while (pointer !== null && container !== pointer && container.contains(pointer)) {
    offsetParents.push(pointer);
    pointer = pointer.offsetParent as HTMLElement;
  }
  const top = selected.offsetTop + offsetParents.reduce((prev, curr) => prev + curr.offsetTop, 0);
  const bottom = top + selected.offsetHeight;
  const viewRectTop = container.scrollTop;
  const viewRectBottom = viewRectTop + container.clientHeight;

  if (top < viewRectTop) {
    container.scrollTop = top;
  } else if (bottom > viewRectBottom) {
    container.scrollTop = bottom - container.clientHeight;
  }
}

let scrollBarWidth: number;
export const getScrollBarWidth = (): number => {
  if (!isClient) {
    return 0;
  }
  if (scrollBarWidth !== undefined) {
    return scrollBarWidth;
  }

  const outer = document.createElement('div');
  outer.className = 'el-scrollbar__wrap';
  outer.style.visibility = 'hidden';
  outer.style.width = '100px';
  outer.style.position = 'absolute';
  outer.style.top = '-9999px';
  document.body.appendChild(outer);

  const widthNoScroll = outer.offsetWidth;
  outer.style.overflow = 'scroll';

  const inner = document.createElement('div');
  inner.style.width = '100%';
  outer.appendChild(inner);

  const widthWithScroll = inner.offsetWidth;
  outer.parentNode?.removeChild(outer);
  scrollBarWidth = widthNoScroll - widthWithScroll;

  return scrollBarWidth;
};

/**
 * Determine if the testing element is visible on screen no matter if its on the viewport or not
 */
export const isVisible = (element: HTMLElement) => {
  if (process.env.NODE_ENV === 'test') {
    return true;
  }
  const computed = getComputedStyle(element);
  // element.offsetParent won't work on fix positioned
  // WARNING: potential issue here, going to need some expert advices on this issue
  return computed.position === 'fixed' ? false : element.offsetParent !== null;
};

/**
 * @desc Determine if target element is focusable
 * @param element {HTMLElement}
 * @returns {Boolean} true if it is focusable
 */
export const isFocusable = (element: HTMLElement): boolean => {
  if (element.tabIndex > 0 || (element.tabIndex === 0 && element.getAttribute('tabIndex') !== null)) {
    return true;
  }
  // HTMLButtonElement has disabled
  if ((element as HTMLButtonElement).disabled) {
    return false;
  }

  switch (element.nodeName) {
    case 'A': {
      // casting current element to Specific HTMLElement in order to be more type precise
      return Boolean((element as HTMLAnchorElement).href) && (element as HTMLAnchorElement).rel !== 'ignore';
    }
    case 'INPUT': {
      return !((element as HTMLInputElement).type === 'hidden' || (element as HTMLInputElement).type === 'file');
    }
    case 'BUTTON':
    case 'SELECT':
    case 'TEXTAREA': {
      return true;
    }
    default: {
      return false;
    }
  }
};

const FOCUSABLE_ELEMENT_SELECTORS =
  'a[href],button:not([disabled]),button:not([hidden]),:not([tabindex="-1"]),input:not([disabled]),input:not([type="hidden"]),select:not([disabled]),textarea:not([disabled])';

export const obtainAllFocusableElements = (element: HTMLElement): HTMLElement[] => {
  return Array.from(element.querySelectorAll<HTMLElement>(FOCUSABLE_ELEMENT_SELECTORS)).filter((item: HTMLElement) => isFocusable(item) && isVisible(item));
};

export const getClientXY = (event: MouseEvent | TouchEvent | Event) => {
  let clientX: number;
  let clientY: number;
  if (event.type === 'touchend') {
    clientY = (event as TouchEvent).changedTouches[0].clientY;
    clientX = (event as TouchEvent).changedTouches[0].clientX;
  } else if (event.type.startsWith('touch')) {
    clientY = (event as TouchEvent).touches[0].clientY;
    clientX = (event as TouchEvent).touches[0].clientX;
  } else {
    clientY = (event as MouseEvent).clientY;
    clientX = (event as MouseEvent).clientX;
  }
  return {
    clientX,
    clientY,
  };
};

/**
 * 判断元素是否在容器中
 * @param el 元素
 * @param container 容器
 * @returns boolean
 */
export const isInContainer = (el?: Element, container?: Element | Window): boolean => {
  if (!isClient || !el || !container) return false;

  const elRect = el.getBoundingClientRect();

  let containerRect: Pick<DOMRect, 'top' | 'bottom' | 'left' | 'right'>;
  if (container instanceof Element) {
    containerRect = container.getBoundingClientRect();
  } else {
    containerRect = {
      top: 0,
      right: window.innerWidth,
      bottom: window.innerHeight,
      left: 0,
    };
  }
  return elRect.top < containerRect.bottom && elRect.bottom > containerRect.top && elRect.right > containerRect.left && elRect.left < containerRect.right;
};
