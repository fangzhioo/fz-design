<script setup lang="ts">
  import { ref } from 'vue'
  const buttonRef = ref()
  const tooltipRef = ref()

  const visible = ref(false)
</script>

<template>
  <div>
    <fz-button
      v-for="i in 3"
      :key="i"
      @mouseover="e => (buttonRef = e.currentTarget)"
      @click="visible = !visible"
    >
      Click to open tooltip
    </fz-button>
  </div>

  <fz-tooltip
    ref="tooltipRef"
    :visible="visible"
    :popper-options="{
      modifiers: [
        {
          name: 'computeStyles',
          options: {
            adaptive: false,
            enabled: false
          }
        }
      ]
    }"
    :virtual-ref="buttonRef"
    virtual-triggering
    popper-class="singleton-tooltip"
  >
    <template #content>
      <span> Some content </span>
    </template>
  </fz-tooltip>
</template>

<style>
  .singleton-tooltip {
    transition: transform 0.3s var(--fz-transition-function-fast-bezier);
  }
</style>
