<script lang="ts" setup>
  import { ref } from 'vue'

  const value = ref(false)
</script>

<template>
  <fz-checkbox v-model="value" label="爱在西元前" size="small" />
  <fz-checkbox v-model="value" label="爱在西元前" />
  <fz-checkbox v-model="value" label="爱在西元前" size="large" />
</template>

<style scoped>
.fz-checkbox {
    margin-right: 20px;
}
</style>
