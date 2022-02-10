<template>
  <transition name="fz-message-fade" @before-leave="onClose" @after-leave="$emit('destroy')">
    <div
      v-show="visible"
      :id="id"
      :class="['fz-message', type && !icon ? `fz-message--${type}` : '', center ? 'is-center' : '', showClose ? 'is-closable' : '', customClass]"
      :style="customStyle"
      role="alert"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
    >
      <fz-badge v-if="repeatNum > 1" :value="repeatNum" :type="badgeType" class="fz-message__badge"> </fz-badge>
      <fz-icon v-if="iconName" :name="iconName" class="fz-message__icon" />
      <slot>
        <p v-if="!dangerouslyUseHTMLString" class="fz-message__content">
          {{ message }}
        </p>
        <!-- Caution here, message could've been compromised, never use user's input as message -->
        <p v-else class="fz-message__content" v-html="message"></p>
      </slot>
      <fz-icon v-if="showClose" name="close-bold" class="fz-message__close" @click.stop="close" />
    </div>
  </transition>
</template>

<script lang="ts">
import { EVENT_CODE } from '@fzui/utils/constants';
import { useEventListener, useTimeoutFn } from '@vueuse/core';
import { computed, CSSProperties, defineComponent, onMounted, ref, watch } from 'vue';
import { messageEmits, messageProps } from './Message';
import { Icon } from '@fzui/components/Icon';
import { BadgeProps, Badge } from '@fzui/components/Badge';
import { TypeIconsNameMap } from '@fzui/utils/icon';

export default defineComponent({
  name: 'FzMessage',
  components: {
    FzIcon: Icon,
    FzBadge: Badge,
  },
  props: messageProps,
  emits: messageEmits,
  setup(props) {
    const visible = ref(false);
    const badgeType = ref<BadgeProps['type']>(props.type || 'info');
    let stopTimer: (() => void) | undefined;

    const iconName = computed(() => {
      return props.icon || TypeIconsNameMap[props.type] || '';
    });

    const customStyle = computed<CSSProperties>(() => ({
      top: `${props.offset}px`,
      zIndex: props.zIndex,
    }));

    function close() {
      visible.value = false;
    }

    function startTimer() {
      if (props.duration > 0) {
        ({ stop: stopTimer } = useTimeoutFn(() => {
          if (visible.value) {
            close();
          }
        }, props.duration));
      }
    }

    function clearTimer() {
      stopTimer?.();
    }

    function keydown({ code }: KeyboardEvent) {
      if (code === EVENT_CODE.esc) {
        // press esc to close the message
        if (visible.value) {
          close();
        }
      } else {
        startTimer(); // resume timer
      }
    }

    onMounted(() => {
      startTimer();
      visible.value = true;
    });

    watch(
      () => props.repeatNum,
      () => {
        clearTimer();
        startTimer();
      },
    );

    useEventListener(document, 'keydown', keydown);

    return {
      iconName,
      customStyle,
      visible,
      badgeType,

      close,
      clearTimer,
      startTimer,
    };
  },
});
</script>
