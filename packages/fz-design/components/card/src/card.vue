<script lang="ts" setup>
  import { Props } from './props'

  defineOptions({name: 'FzCard'})

  defineProps(Props)
</script>

<template>
  <div :class="['fz-card', {[`is-${shadow}-shadow`]: shadow }]">
    <div v-if="$slots.header || header" class="fz-card__header">
      <slot name="header">{{ header }}</slot>
    </div>
    <div class="fz-card__body" :style="bodyStyle">
      <slot></slot>
    </div>
  </div>
</template>
