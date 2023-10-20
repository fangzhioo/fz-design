<script lang="ts" setup>
  import { ref } from 'vue'

  const value = ref('天青色等烟雨')
</script>

<template>
  <fz-input v-model="value" clearable placeholder="请输入...." />
</template>
