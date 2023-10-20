<script lang="ts" setup>
  import { ref } from 'vue'

  const value = ref('')
</script>

<template>
  <fz-input v-model="value" placeholder="请输入...." size="small" />
  <fz-input v-model="value" placeholder="请输入...." />
  <fz-input v-model="value" placeholder="请输入...." size="large" />
</template>

<style scoped>
.fz-input {
  margin-bottom: 20px;
}
</style>
