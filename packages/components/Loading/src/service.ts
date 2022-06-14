import { nextTick } from 'vue';
import { isString } from '@vue/shared';
import { isClient } from '@vueuse/core';
import { addClass, getStyle, removeClass } from '@fzui/utils';
import { useZIndex } from '@fzui/hooks';
import { createLoadingComponent } from './create-loading';
import type { LoadingInstance } from './create-loading';
import type { LoadingOptionsResolved } from '..';
import type { LoadingOptions } from './Loading';
import type { CSSProperties } from 'vue';

let fullscreenInstance: LoadingInstance | undefined = undefined;

export const Loading = function (options: LoadingOptions = {}): LoadingInstance {
  if (!isClient) return undefined as any;

  const resolved = resolveOptions(options);

  if (resolved.fullscreen && fullscreenInstance) {
    return fullscreenInstance;
  }

  const instance = createLoadingComponent({
    ...resolved,
    closed: () => {
      resolved.closed?.();
      if (resolved.fullscreen) fullscreenInstance = undefined;
    },
  });

  addStyle(resolved, resolved.parent, instance);
  addClassList(resolved, resolved.parent, instance);

  resolved.parent.vLoadingAddClassList = () => addClassList(resolved, resolved.parent, instance);

  /**
   * add loading-number to parent.
   * because if a fullscreen loading is triggered when somewhere
   * a v-loading.body was triggered before and it's parent is
   * document.body which with a margin , the fullscreen loading's
   * destroySelf function will remove 'el-loading-parent--relative',
   * and then the position of v-loading.body will be error.
   */
  let loadingNumber: string | null = resolved.parent.getAttribute('loading-number');
  if (!loadingNumber) {
    loadingNumber = '1';
  } else {
    loadingNumber = `${Number.parseInt(loadingNumber) + 1}`;
  }
  resolved.parent.setAttribute('loading-number', loadingNumber);

  resolved.parent.appendChild(instance.$el);

  // after instance render, then modify visible to trigger transition
  nextTick(() => (instance.visible.value = resolved.visible));

  if (resolved.fullscreen) {
    fullscreenInstance = instance;
  }
  return instance;
};

const resolveOptions = (options: LoadingOptions): LoadingOptionsResolved => {
  let target: HTMLElement;
  if (isString(options.target)) {
    target = document.querySelector<HTMLElement>(options.target) ?? document.body;
  } else {
    target = options.target || document.body;
  }
  return {
    parent: target === document.body || options.body ? document.body : target,
    background: options.background || '',
    svg: options.svg || '',
    svgViewBox: options.svgViewBox || '',
    spinner: options.spinner || false,
    text: options.text || '',
    fullscreen: target === document.body && (options.fullscreen ?? true),
    lock: options.lock ?? false,
    customClass: options.customClass || '',
    visible: options.visible ?? true,
    target,
  };
};

const addStyle = async (options: LoadingOptionsResolved, parent: HTMLElement, instance: LoadingInstance) => {
  const { nextZIndex } = useZIndex();

  const maskStyle: CSSProperties = {};
  if (options.fullscreen) {
    instance.originalPosition.value = getStyle(document.body, 'position');
    instance.originalOverflow.value = getStyle(document.body, 'overflow');
    maskStyle.zIndex = nextZIndex();
  } else if (options.parent === document.body) {
    instance.originalPosition.value = getStyle(document.body, 'position');
    /**
     * await dom render when visible is true in init,
     * because some component's height maybe 0.
     * e.g. fz-table.
     */
    await nextTick();
    const clientRect = (options.target as HTMLElement).getBoundingClientRect();
    const tlArr: Array<'top' | 'left'> = ['top', 'left'];
    const hwArr: Array<'height' | 'width'> = ['height', 'width'];
    for (const property of tlArr) {
      const scroll = property === 'top' ? 'scrollTop' : 'scrollLeft';
      const viewPx =
        clientRect[property] + document.body[scroll] + document.documentElement[scroll] - Number.parseInt(getStyle(document.body, `margin-${property}`), 10);
      maskStyle[property] = `${viewPx}px`;
    }
    for (const property of hwArr) {
      maskStyle[property] = `${clientRect[property]}px`;
    }
  } else {
    instance.originalPosition.value = getStyle(parent, 'position');
  }
  for (const [key, value] of Object.entries(maskStyle)) {
    instance.$el.style[key as any] = value;
  }
};

const addClassList = (options: LoadingOptions, parent: HTMLElement, instance: LoadingInstance) => {
  if (instance.originalPosition.value !== 'absolute' && instance.originalPosition.value !== 'fixed') {
    addClass(parent, 'fz-loading-parent--relative');
  } else {
    removeClass(parent, 'fz-loading-parent--relative');
  }
  if (options.fullscreen && options.lock) {
    addClass(parent, 'fz-loading-parent--hidden');
  } else {
    removeClass(parent, 'fz-loading-parent--hidden');
  }
};
