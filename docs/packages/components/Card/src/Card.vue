<template>
  <div class="fz-card" :class="shadow ? 'is-' + shadow + '-shadow' : 'is-always-shadow'">
    <div v-if="$slots.header || header" class="fz-card__header">
      <slot name="header">{{ header }}</slot>
    </div>
    <div class="fz-card__body" :style="bodyStyle">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { cardProps } from './Card';

export default defineComponent({
  name: 'FzCard',
  props: cardProps,
});
</script>
