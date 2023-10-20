<script lang="ts" setup>
  import { ref } from 'vue'

  const value = ref('')
</script>

<template>
  <fz-input v-model="value" type="text" placeholder="请输入...." />
  <fz-input v-model="value" type="password" show-password placeholder="请输入...." />
  <fz-input v-model="value" type="hidden" placeholder="请输入...." />
</template>

<style scoped>
.fz-input {
  margin-bottom: 20px;
}
</style>
