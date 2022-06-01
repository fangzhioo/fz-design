<template>
  <fz-input-number v-model="num" :min="1" :max="10" @change="handleChange" class="mr-2" />
  <fz-input-number v-model="num" :disabled="true" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const num = ref(1);
const handleChange = (value: number) => {
  console.log(value);
};
</script>

<style scoped>
.mr-2 {
  margin-right: 8px;
}
</style>
