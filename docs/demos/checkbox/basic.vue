<script lang="ts" setup>
  import { ref } from 'vue'

  const value = ref(false)
</script>

<template>
  <fz-checkbox v-model="value" label="爱在西元前" />
</template>
