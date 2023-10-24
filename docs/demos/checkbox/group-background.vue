<script lang="ts" setup>
  import { ref } from 'vue'

  const value = ref([])
</script>

<template>
  <fz-space direction="vertical" alignment="flex-start">
    <fz-checkbox-group v-model="value" background size="small">
      <fz-checkbox label="1">备选项1</fz-checkbox>
      <fz-checkbox label="2">备选项2</fz-checkbox>
      <fz-checkbox label="3">备选项3</fz-checkbox>
    </fz-checkbox-group>
    <fz-checkbox-group v-model="value" background>
      <fz-checkbox label="1">备选项1</fz-checkbox>
      <fz-checkbox label="2">备选项2</fz-checkbox>
      <fz-checkbox label="3">备选项3</fz-checkbox>
    </fz-checkbox-group>
    <fz-checkbox-group v-model="value" background size="large">
      <fz-checkbox label="1">备选项1</fz-checkbox>
      <fz-checkbox label="2">备选项2</fz-checkbox>
      <fz-checkbox label="3">备选项3</fz-checkbox>
    </fz-checkbox-group>
  </fz-space>
</template>

<style scoped>
  .fz-checkbox-group {
    margin-bottom: 20px;
  }
</style>
