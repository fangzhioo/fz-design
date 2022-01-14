<template>
  <div class="fz-badge">
    <slot></slot>
    <transition name="fz-zoom-in-center">
      <sup
        v-show="!hidden && (content || content === '0' || isDot)"
        class="fz-badge__content"
        :class="[
          'fz-badge__content--' + type,
          {
            'is-fixed': $slots.default,
            'is-dot': isDot,
          },
        ]"
        v-text="content"
      >
      </sup>
    </transition>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { badgeProps } from './Badge';

export default defineComponent({
  name: 'FzBadge',

  props: badgeProps,

  setup(props) {
    const content = computed<string>(() => {
      if (props.isDot) {
        return '';
      }

      if (typeof props.value === 'number' && typeof props.max === 'number') {
        return props.max < props.value ? `${props.max}+` : `${props.value}`;
      }
      return `${props.value}`;
    });

    return {
      content,
    };
  },
});
</script>
