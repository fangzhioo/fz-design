<script lang="ts" setup>
  import { ref } from 'vue'

  const value = ref('1')
</script>

<template>
  <fz-space direction="vertical" alignment="flex-start">
    <fz-radio-group v-model="value" size="small">
      <fz-radio label="1">备选项1</fz-radio>
      <fz-radio label="2">备选项2</fz-radio>
      <fz-radio label="3">备选项3</fz-radio>
    </fz-radio-group>
    <fz-radio-group v-model="value">
      <fz-radio label="1">备选项1</fz-radio>
      <fz-radio label="2">备选项2</fz-radio>
      <fz-radio label="3">备选项3</fz-radio>
    </fz-radio-group>
    <fz-radio-group v-model="value" size="large">
      <fz-radio label="1">备选项1</fz-radio>
      <fz-radio label="2">备选项2</fz-radio>
      <fz-radio label="3">备选项3</fz-radio>
    </fz-radio-group>
  </fz-space>
</template>
