<template>
  <fz-input-number v-model="num" :step="2" />

  <fz-input-number v-model="num2" class="mx-4" :step="2" step-strictly />

  <fz-input-number v-model="num3" :precision="2" :step="0.1" :max="10" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const num = ref(5);
const num2 = ref(4);
const num3 = ref(3.14);
</script>

<style scoped>
.mx-4 {
  margin: 0 16px;
}
</style>
