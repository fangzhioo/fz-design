<script lang="ts" setup>
  import { ref } from 'vue'

  const value = ref('天青色等烟雨，\n而我在等你，\n炊烟袅袅升起，\n隔江千万里\n')
</script>

<template>
  <fz-textarea v-model="value" :autosize="{ minRows: 3, maxRows: 5 }" placeholder="请输入...." />
</template>
