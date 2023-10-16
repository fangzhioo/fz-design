<script setup lang="ts">
  import { ref } from 'vue'
  const open = ref(false)
</script>

<template>
  <fz-sticky-card :open="open">
    <template #source>
      <h1>你好世界！</h1>
      <h1>你好世界！</h1>
      <h1>你好世界！</h1>
    </template>

    <h1>Hello World！</h1>
    <h1>Hello World！</h1>
    <h1>Hello World！</h1>
    <h1>Hello World！</h1>
    <h1>Hello World！</h1>
    <h1>Hello World！</h1>
    <h1>Hello World！</h1>
    <h1>Hello World！</h1>
  </fz-sticky-card>
</template>
