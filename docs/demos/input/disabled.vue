<script lang="ts" setup>
  import { ref } from 'vue'

  const value = ref('天青色等烟雨')
</script>

<template>
  <fz-input v-model="value" disabled placeholder="请输入...." />
  <fz-input v-model="value" readonly placeholder="请输入...." />
</template>

<style scoped>
.fz-input {
  margin-bottom: 20px;
}
</style>
