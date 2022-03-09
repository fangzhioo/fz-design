<template>
  <div class="demo-color-sizes">
    <fz-color-picker v-model="color" size="large" />
    <fz-color-picker v-model="color" />
    <fz-color-picker v-model="color" size="small" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const color = ref('409EFF');
</script>

<style>
.demo-color-sizes .fz-color-picker:not(:last-child) {
  margin-right: 16px;
}
</style>
