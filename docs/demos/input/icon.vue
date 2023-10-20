<script lang="ts" setup>
  import { ref } from 'vue'
  import { IconUser, IconLock } from '@fz-design/fz-design-icon'

  const value = ref('')
</script>

<template>
  <fz-input v-model="value" :prefix-icon="IconUser" placeholder="请输入...." />
  <fz-input v-model="value" :suffix-icon="IconLock" placeholder="请输入...." />
</template>

<style scoped>
.fz-input {
  margin-bottom: 20px;
}
</style>
