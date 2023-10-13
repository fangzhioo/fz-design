import { onBeforeMount } from 'vue';
import { generateUUID, isClient } from '../utils';

let cachedContainer: HTMLElement;

export const POPPER_CONTAINER_ID = `fz-popper-container-${generateUUID()}`;

export const POPPER_CONTAINER_SELECTOR = `#${POPPER_CONTAINER_ID}`;

export const usePopperContainer = () => {
  onBeforeMount(() => {
    if (!isClient) {
      return;
    }

    // This is for bypassing the error that when under testing env, we often encounter
    // document.body.innerHTML = '' situation
    // for this we need to disable the caching since it's not really needed
    if (!cachedContainer) {
      const container = document.createElement('div');
      container.id = POPPER_CONTAINER_ID;
      document.body.appendChild(container);
      cachedContainer = container;
    }
  });
};
