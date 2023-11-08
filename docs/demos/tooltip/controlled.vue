<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
</script>

<template>
  <fz-tooltip :visible="visible">
    <template #content>
      <span>Content</span>
    </template>
    <fz-button @mouseenter="visible = true" @mouseleave="visible = false">
      Hover me
    </fz-button>
  </fz-tooltip>
</template>
