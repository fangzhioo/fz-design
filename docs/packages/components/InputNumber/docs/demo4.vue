<template>
  <fz-input-number v-model="num1" size="large" />
  <fz-input-number v-model="num2" class="mx-4" />
  <fz-input-number v-model="num3" size="small" class="mr-4" />
  <fz-input-number v-model="num4" size="mini" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const num1 = ref(1);
const num2 = ref(2);
const num3 = ref(3);
const num4 = ref(4);
</script>

<style scoped>
.mx-4 {
  margin: 0 16px;
}
.mr-4 {
  margin-right: 16px;
}
</style>
