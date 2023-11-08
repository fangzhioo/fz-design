<script lang="ts" setup>
import { ref } from 'vue'

const disabled = ref(false)

const toggle = (): void => {
  disabled.value = !disabled.value
}
</script>

<template>
  <fz-tooltip
    :disabled="disabled"
    content="click to close tooltip function"
    placement="bottom"
    effect="light"
  >
    <fz-button @click="toggle">
      click to {{ disabled ? 'active' : 'close' }} tooltip function
    </fz-button>
  </fz-tooltip>
</template>

<style>
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.expand-fade-leave-active {
  margin-left: 20px;
  opacity: 0;
}
</style>
