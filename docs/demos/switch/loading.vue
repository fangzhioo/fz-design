<script lang="ts" setup>
import { ref } from 'vue'

const value1 = ref(true)
const value2 = ref(false)
</script>

<template>
  <fz-switch v-model="value1" loading />
  <fz-switch v-model="value2" loading class="ml-2" />
</template>

<style scoped>
.ml-2 {
  margin-left: 8px;
}
</style>
