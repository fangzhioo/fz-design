<script lang="ts" setup>
  import { ref } from 'vue'

  const value = ref('天青色等烟雨，而我在等你，炊烟袅袅升起，隔江千万里')
</script>

<template>
  <fz-textarea v-model="value" maxlength="50" placeholder="最大内容长度50...." />
</template>

<style>
.fz-textarea {
  margin-bottom: 20px;
}
</style>
