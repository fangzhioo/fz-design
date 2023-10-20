<script lang="ts" setup>
  import { ref } from 'vue'

  const value = ref('')

  const handleSearch = (val: string): void => {
    console.log('search', val);
    
  }
</script>

<template>
  <fz-input v-model="value" search placeholder="请输入...." @search="handleSearch" />
</template>
