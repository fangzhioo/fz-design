<script lang="ts" setup>
  import { ref } from 'vue'

  const value = ref('1')
</script>

<template>
  <fz-radio v-model="value" name="radio" size="small" label="1">备选项1</fz-radio>
  <fz-radio v-model="value" name="radio" label="2">备选项2</fz-radio>
  <fz-radio v-model="value" name="radio" size="large" label="3">备选项3</fz-radio>
</template>

<style scoped>
.fz-radio {
    margin-right: 20px;
}
</style>
