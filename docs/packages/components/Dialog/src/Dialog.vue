<template>
  <teleport to="body" :disabled="!appendToBody">
    <transition name="dialog-fade" @after-enter="afterEnter" @after-leave="afterLeave" @before-leave="beforeLeave">
      <fz-overlay v-show="visible" custom-mask-event :mask="modal" :overlay-class="modalClass" :z-index="zIndex">
        <div class="fz-overlay-dialog" @click="overlayEvent.onClick" @mousedown="overlayEvent.onMousedown" @mouseup="overlayEvent.onMouseup">
          <div
            ref="dialogRef"
            v-trap-focus
            :class="[
              'fz-dialog',
              {
                'is-fullscreen': fullscreen,
                'is-draggable': draggable,
                'fz-dialog--center': center,
              },
              customClass,
            ]"
            aria-modal="true"
            role="dialog"
            :aria-label="title || 'dialog'"
            :style="style"
            @click.stop=""
          >
            <div ref="headerRef" class="fz-dialog__header">
              <slot name="title">
                <span class="fz-dialog__title">
                  {{ title }}
                </span>
              </slot>
              <button v-if="showClose" aria-label="close" class="fz-dialog__headerbtn" type="button" @click="handleClose">
                <fz-icon class="fz-dialog__close" :name="closeIcon" />
              </button>
            </div>
            <template v-if="rendered">
              <div class="fz-dialog__body">
                <slot></slot>
              </div>
            </template>
            <div v-if="$slots.footer" class="fz-dialog__footer">
              <slot name="footer"></slot>
            </div>
          </div>
        </div>
      </fz-overlay>
    </transition>
  </teleport>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { TrapFocus } from '@fzui/directives';
import { useDraggable, useSameTarget } from '@fzui/hooks';
import { dialogProps, dialogEmits } from './Dialog';
import { useDialog } from './hooks/useDialog';
import { Icon } from '@fzui/components/Icon';
import { Overlay } from '@fzui/components/Overlay';

export default defineComponent({
  name: 'FzDialog',
  components: {
    FzOverlay: Overlay,
    FzIcon: Icon,
  },
  directives: {
    TrapFocus,
  },

  props: dialogProps,
  emits: dialogEmits,

  setup(props, ctx) {
    const dialogRef = ref<HTMLElement>();
    const headerRef = ref<HTMLElement>();
    const dialog = useDialog(props, ctx, dialogRef);
    const overlayEvent = useSameTarget(dialog.onModalClick);

    const draggable = computed(() => props.draggable && !props.fullscreen);
    useDraggable(dialogRef, headerRef, draggable);

    return {
      dialogRef,
      headerRef,
      overlayEvent,
      ...dialog,
    };
  },
});
</script>
