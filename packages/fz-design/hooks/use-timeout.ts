// import { tryOnScopeDispose } from '@vueuse/core';
import { onUnmounted } from 'vue';

export function useTimeout() {
  let timeoutHandle: number;

  const cancelTimeout = () => window.clearTimeout(timeoutHandle);

  const registerTimeout = (fn: (...args: any[]) => any, delay: number) => {
    cancelTimeout();
    timeoutHandle = window.setTimeout(fn, delay);
  };

  // tryOnScopeDispose(() => cancelTimeout());
  // TODO 实现tryOnScopeDispose替换onBeforeUnmount
  onUnmounted(() => {
    cancelTimeout()
  })

  return {
    registerTimeout,
    cancelTimeout,
  };
}
