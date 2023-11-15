<script lang="ts" setup>
import { ref } from 'vue'
const text = ref('')
</script>

<template>
  <fz-input
    v-model="text"
    maxlength="10"
    placeholder="Please input"
    show-word-limit
    type="text"
  />
</template>
