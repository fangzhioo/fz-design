<script lang="ts" setup>
import { ref } from 'vue'

const num = ref(1)
const handleChange = (value: number): void => {
  console.log(value)
}
</script>
<template>
  <fz-input-number
    v-model="num"
    :min="1"
    :max="10"
    controls-position="right"
    size="large"
    @change="handleChange"
  />
  <fz-input-number
    v-model="num"
    class="mx-4"
    :min="1"
    :max="10"
    controls-position="right"
    @change="handleChange"
  />
  <fz-input-number
    v-model="num"
    :min="1"
    :max="10"
    size="small"
    controls-position="right"
    @change="handleChange"
  />
</template>

<style scoped>
.mx-4 {
  margin: 0 16px;
}
</style>
