<script lang="ts" setup>
  import { ref } from 'vue'

  const value = ref('')
  const value1 = ref('')
</script>

<template>
  <fz-input v-model="value" placeholder="请输入...." />
  <fz-input v-model="value1" maxlength="10" placeholder="请输入...." />
</template>

<style scoped>
.fz-input {
  margin-bottom: 20px;
}
</style>
