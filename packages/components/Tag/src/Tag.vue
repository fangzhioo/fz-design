<template>
  <span v-if="!disableTransitions" :class="classes" :style="{ backgroundColor: color }" @click="handleClick">
    <span class="fz-tag__content">
      <slot></slot>
    </span>
    <fz-icon v-if="closable" name="close-bold" class="fz-tag__close" @click="handleClose" />
  </span>
  <transition v-else name="fz-zoom-in-center">
    <span :class="classes" :style="{ backgroundColor: color }" @click="handleClick">
      <span class="fz-tag__content">
        <slot></slot>
      </span>
      <fz-icon v-if="closable" name="close-bold" class="fz-tag__close" @click="handleClose" />
    </span>
  </transition>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { Icon } from '@fzui/components/Icon';
import { useSize } from '@fzui/hooks';
import { tagProps, tagEmits } from './Tag';

export default defineComponent({
  name: 'FzTag',
  components: {
    FzIcon: Icon,
  },
  props: tagProps,
  emits: tagEmits,
  setup(props, { emit }) {
    const tagSize = useSize();
    const classes = computed(() => {
      const { type, hit, effect, closable } = props;
      return [
        'fz-tag',
        {
          'is-closable': closable,
          'is-hit': hit,
        },
        `fz-tag--${type}`,
        `fz-tag--${tagSize.value}`,
        `fz-tag--${effect}`,
      ];
    });

    // methods
    const handleClose = (event: MouseEvent) => {
      event.stopPropagation();
      emit('close', event);
    };

    const handleClick = (event: MouseEvent) => {
      emit('click', event);
    };

    return {
      classes,
      handleClose,
      handleClick,
    };
  },
});
</script>
