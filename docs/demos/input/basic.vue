<script lang="ts" setup>
import { ref } from 'vue'
const value = ref('爱在西元前')
</script>

<template>
  <fz-input v-model="value" placeholder="请输入内容" />
  <fz-input v-model="value" type="hidden" placeholder="隐藏的输入框" />
</template>
