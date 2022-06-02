<template>
  <a
    :class="[
      'fz-link',
      `fz-link--${type}`,
      {
        'is-disabled': disabled,
        'is-underline': underline && !disabled,
      },
    ]"
    :href="disabled || !href ? undefined : href"
    @click="handleClick"
  >
    <fz-icon v-if="icon" :name="icon" />
    <span v-if="$slots.default" class="fz-link__inner">
      <slot />
    </span>

    <slot v-if="$slots.icon" name="icon" />
  </a>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { linkEmits, linkProps } from './Link';

export default defineComponent({
  name: 'FzLink',
  props: linkProps,
  emits: linkEmits,
  setup(props, { emit }) {
    function handleClick(event: MouseEvent) {
      if (!props.disabled) emit('click', event);
    }
    return {
      handleClick,
    };
  },
});
</script>
