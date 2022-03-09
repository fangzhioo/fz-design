<template>
  <fz-radio-group v-model="radio">
    <fz-radio :label="3">Option A</fz-radio>
    <fz-radio :label="6">Option B</fz-radio>
    <fz-radio :label="9">Option C</fz-radio>
  </fz-radio-group>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const radio = ref(3);
</script>
