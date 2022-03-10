<template>
  <teleport to="body" :disabled="!appendToBody">
    <transition name="fz-drawer-fade" @after-enter="afterEnter" @after-leave="afterLeave" @before-leave="beforeLeave">
      <fz-overlay v-show="visible" :mask="modal" :overlay-class="modalClass" :z-index="zIndex" @click="onModalClick">
        <div
          ref="drawerRef"
          v-trap-focus
          aria-modal="true"
          aria-labelledby="fz-drawer__title"
          :aria-label="title"
          :class="['fz-drawer', direction, { open: visible }, customClass]"
          :style="isHorizontal ? 'width: ' + drawerSize : 'height: ' + drawerSize"
          role="dialog"
          @click.stop
        >
          <header v-if="withHeader" id="fz-drawer__title" class="fz-drawer__header">
            <slot name="title">
              <span role="heading" :title="title">
                {{ title }}
              </span>
            </slot>
            <button v-if="showClose" :aria-label="'close ' + (title || 'drawer')" class="fz-drawer__close-btn" type="button" @click="handleClose">
              <fz-icon class="fz-drawer__close" :name="closeIcon"></fz-icon>
            </button>
          </header>
          <template v-if="rendered">
            <section class="fz-drawer__body">
              <slot></slot>
            </section>
          </template>
          <div v-if="$slots.footer" class="fz-drawer__footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </fz-overlay>
    </transition>
  </teleport>
</template>

<script lang="ts">
import { useDialog } from '@fzui/components/Dialog';
import { Icon } from '@fzui/components/Icon';
import { Overlay } from '@fzui/components/Overlay';
import { TrapFocus } from '@fzui/directives';
import { computed, defineComponent, ref } from 'vue';
import { drawerEmits, drawerProps } from './Drawer';

export default defineComponent({
  name: 'FzDrawer',
  components: {
    FzOverlay: Overlay,
    FzIcon: Icon,
  },
  directives: {
    TrapFocus,
  },
  props: drawerProps,
  emits: drawerEmits,
  setup(props, context) {
    const drawerRef = ref<HTMLElement>();

    const isHorizontal = computed(() => props.direction === 'rtl' || props.direction === 'ltr');
    const drawerSize = computed(() => (typeof props.size === 'number' ? `${props.size}px` : props.size));

    return {
      ...useDialog(props, context, drawerRef),
      drawerRef,
      isHorizontal,
      drawerSize,
    };
  },
});
</script>
