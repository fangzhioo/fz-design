<script setup lang="ts">
  import { ref } from 'vue'
  const open = ref(false)
</script>

<template>
  <fz-swap v-model="open" />
</template>
