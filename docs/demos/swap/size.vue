<script setup lang="ts">
  import { ref } from 'vue'
  const open = ref(false)
  const size = ref(20)
</script>

<template>
  <div>{{ size }}</div>
  <fz-slider v-model="size" />
  
  <fz-swap v-model="open" :size="size" />
</template>
