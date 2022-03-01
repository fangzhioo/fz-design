/* eslint-disable no-invalid-this */
import normalizeWheel from 'normalize-wheel-es';
import { isFirefox } from '@fzui/utils';
import type { ObjectDirective, DirectiveBinding } from 'vue';

const mousewheel = function (element: any, callback: any) {
  if (element && element.addEventListener) {
    const fn = function (this: any, event: any) {
      const normalized = normalizeWheel(event);

      if (callback) {
        // eslint-disable-next-line prefer-reflect
        callback.apply(this, [event, normalized]);
      }
    };
    if (isFirefox()) {
      element.addEventListener('DOMMouseScroll', fn);
    } else {
      element.onmousewheel = fn;
    }
  }
};

const Mousewheel: ObjectDirective = {
  beforeMount(el: HTMLElement, binding: DirectiveBinding) {
    mousewheel(el, binding.value);
  },
};

export default Mousewheel;
