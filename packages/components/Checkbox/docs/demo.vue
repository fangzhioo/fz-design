<template>
  <div>
    <fz-checkbox v-model="checked1" label="Option 1" size="large"></fz-checkbox>
    <fz-checkbox v-model="checked2" label="Option 2"></fz-checkbox>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const checked1 = ref(true);
const checked2 = ref(false);
</script>
