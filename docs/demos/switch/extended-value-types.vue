<script lang="ts" setup>
  import { ref } from 'vue'

  const value = ref('100')
</script>

<template>
  <div>
    {{ value }}
  </div>
  <fz-switch
    v-model="value"
    active-value="100"
    inactive-value="0"
  />
</template>
