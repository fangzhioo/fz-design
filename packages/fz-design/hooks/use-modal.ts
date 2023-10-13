import { watch, onMounted, onBeforeUnmount } from 'vue';
import { isClient } from '../utils';
import { EVENT_CODE } from '../constants';

import type { Ref } from 'vue';

type ModalInstance = {
  handleClose: () => void;
};

const modalStack: ModalInstance[] = [];

const closeModal = (e: KeyboardEvent) => {
  if (modalStack.length === 0) {
    return;
  }
  if (e.code === EVENT_CODE.esc) {
    e.stopPropagation();
    const topModal = modalStack[modalStack.length - 1];
    topModal.handleClose();
  }
};

export const useModal = (instance: ModalInstance, visibleRef: Ref<boolean>) => {
  watch(visibleRef, (val) => {
    if (val) {
      modalStack.push(instance);
    } else {
      modalStack.splice(
        modalStack.findIndex((modal) => modal === instance),
        1,
      );
    }
  });

  onMounted(() => {
    isClient && document.addEventListener('keydown', closeModal, false);
  });
  
  onBeforeUnmount(() => {
    isClient && document.removeEventListener('keydown', closeModal, false);
  });
};



