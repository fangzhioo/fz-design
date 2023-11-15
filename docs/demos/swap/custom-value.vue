<script setup lang="ts">
  import { ref } from 'vue'
  const open = ref('on')

  const handleChange = (value: string, e: MouseEvent): void => {
    console.log(value, e)
  }
</script>

<template>
  {{ open }}
  <fz-swap v-model="open" active-value="on" inactive-value="off" @change="handleChange" />
</template>
