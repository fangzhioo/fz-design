<script lang="ts" setup>
  import { ref } from 'vue'

  const value = ref('')
</script>

<template>
  <fz-textarea v-model="value" placeholder="请输入...." />
</template>
