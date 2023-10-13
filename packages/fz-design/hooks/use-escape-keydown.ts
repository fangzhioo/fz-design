import { onMounted, onBeforeUnmount } from 'vue';
import { EVENT_CODE } from '../constants';

export const useEscapeKeydown = (handler?: (e: KeyboardEvent) => void) => {
  const cachedHandler = (e: Event) => {
    const event = e as KeyboardEvent;
    if (event.key === EVENT_CODE.esc) {
      handler?.(event);
    }
  };
  onMounted(() => {
    document.addEventListener('keydown', cachedHandler, false);
  });

  onBeforeUnmount(() => {
    document.removeEventListener('keydown', cachedHandler, false);
  });
};
