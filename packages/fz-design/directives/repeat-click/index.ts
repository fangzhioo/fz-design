import type { ObjectDirective, DirectiveBinding } from 'vue';

export default {
  beforeMount (el: HTMLElement, binding: DirectiveBinding) {
    let interval: any = null;
    let startTime: number;
    const handler = (): any => binding.value && binding.value();
    const clear = (): any => {
      if (Date.now() - startTime < 100) {
        handler();
      }
      clearInterval(interval);
      interval = null;
    };

    el.addEventListener('mousedown', (e: MouseEvent) => {
      if ((e as any).button !== 0) return;
      startTime = Date.now();
      document.addEventListener('mouseup', clear);
      clearInterval(interval);
      interval = setInterval(handler, 100);
    });
  }
} as ObjectDirective;
