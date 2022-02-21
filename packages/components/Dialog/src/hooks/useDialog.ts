import { computed, ref, watch, nextTick, onMounted } from 'vue';
import { useTimeoutFn } from '@vueuse/core';
import { useLockscreen, useRestoreActive, useModal, useZIndex } from '@fzui/hooks';
import { UPDATE_MODEL_EVENT } from '@fzui/constants';
import { isNumber, isClient } from '@fzui/utils';

import type { CSSProperties, Ref, SetupContext } from 'vue';
import type { DialogEmits, DialogProps } from '../Dialog';

interface ICSSProperties extends CSSProperties {
  '--fz-dialog-margin-top'?: string;
  '--fz-dialog-width'?: string;
}

export const useDialog = (props: DialogProps, { emit }: SetupContext<DialogEmits>, targetRef: Ref<HTMLElement | undefined>) => {
  let lastPosition = '';
  const visible = ref(false);
  const closed = ref(false);
  const rendered = ref(false); // when desctroyOnClose is true, we initialize it as false vise versa
  const { nextZIndex } = useZIndex();
  const zIndex = ref(props.zIndex || nextZIndex());

  let openTimer: (() => void) | undefined;
  let closeTimer: (() => void) | undefined;

  const normalizeWidth = computed(() => (isNumber(props.width) ? `${props.width}px` : props.width));

  const style = computed<ICSSProperties>(() => {
    const style: ICSSProperties = {};
    if (!props.fullscreen) {
      if (props.top) {
        style['--fz-dialog-margin-top'] = props.top;
      }
      if (props.width) {
        style['--fz-dialog-width'] = normalizeWidth.value;
      }
    }
    return style;
  });

  function afterEnter() {
    emit('opened');
  }

  function afterLeave() {
    emit('closed');
    emit(UPDATE_MODEL_EVENT, false);
    if (props.destroyOnClose) {
      rendered.value = false;
    }
  }

  function beforeLeave() {
    emit('close');
  }

  function doOpen() {
    if (!isClient) {
      return;
    }

    // if (props.willOpen?.()) {
    //  return
    // }
    visible.value = true;
  }

  function doClose() {
    visible.value = false;
  }

  function open() {
    closeTimer?.();
    openTimer?.();

    if (props.openDelay && props.openDelay > 0) {
      ({ stop: openTimer } = useTimeoutFn(() => doOpen(), props.openDelay));
    } else {
      doOpen();
    }
  }

  function close() {
    // if (this.willClose && !this.willClose()) return;
    openTimer?.();
    closeTimer?.();

    if (props.closeDelay && props.closeDelay > 0) {
      ({ stop: closeTimer } = useTimeoutFn(() => doClose(), props.closeDelay));
    } else {
      doClose();
    }
  }

  function hide(shouldCancel: boolean) {
    if (shouldCancel) {
      return;
    }
    closed.value = true;
    visible.value = false;
  }

  function handleClose() {
    if (props.beforeClose) {
      props.beforeClose(hide);
    } else {
      close();
    }
  }

  function onModalClick() {
    if (props.closeOnClickModal) {
      handleClose();
    }
  }

  if (props.lockScroll) {
    useLockscreen(visible);
  }

  if (props.closeOnPressEscape) {
    useModal(
      {
        handleClose,
      },
      visible,
    );
  }

  useRestoreActive(visible);

  watch(
    () => props.modelValue,
    (val) => {
      if (val) {
        closed.value = false;
        open();
        rendered.value = true; // enables lazy rendering
        emit('open');
        zIndex.value = props.zIndex ? zIndex.value++ : nextZIndex();
        // this.$el.addEventListener('scroll', this.updatePopper)
        nextTick(() => {
          if (targetRef.value) {
            targetRef.value.scrollTop = 0;
          }
        });
      } else if (visible.value) {
        // this.$el.removeEventListener('scroll', this.updatePopper
        close();
      }
    },
  );

  watch(
    () => props.fullscreen,
    (val) => {
      if (!targetRef.value) {
        return;
      }
      if (val) {
        lastPosition = targetRef.value.style.transform;
        targetRef.value.style.transform = '';
      } else {
        targetRef.value.style.transform = lastPosition;
      }
    },
  );

  onMounted(() => {
    if (props.modelValue) {
      visible.value = true;
      rendered.value = true; // enables lazy rendering
      open();
    }
  });

  return {
    afterEnter,
    afterLeave,
    beforeLeave,
    handleClose,
    onModalClick,
    close,
    doClose,
    closed,
    style,
    rendered,
    visible,
    zIndex,
  };
};
