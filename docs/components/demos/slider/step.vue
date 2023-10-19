<script lang="ts" setup>
  import { ref } from 'vue'

  const value1 = ref(50)
</script>

<template>
  {{ value1 }}
  <fz-slider v-model="value1" :step="5" />
</template>
