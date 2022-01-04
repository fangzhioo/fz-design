<template>
  <section class="fz-container" :class="{ 'is-vertical': isVertical }">
    <slot></slot>
  </section>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue';
import type { Component, VNode } from 'vue';
import { containerProps } from './Container';

export default defineComponent({
  name: 'FzContainer',
  props: containerProps,
  setup(props, { slots }) {
    const isVertical = computed(() => {
      if (props.direction === 'vertical') {
        return true;
      } else if (props.direction === 'horizontal') {
        return false;
      }
      if (slots && slots.default) {
        const vNodes: VNode[] = slots.default();
        return vNodes.some((vNode) => {
          const tag = (vNode.type as Component).name;
          return tag === 'FzHeader' || tag === 'FzFooter';
        });
      }
      return false;
    });
    return {
      isVertical,
    };
  },
});
</script>
