<script lang="ts" setup>
import { ref } from 'vue'
const input = ref('')
</script>

<template>
  <fz-input
    v-model="input"
    type="password"
    placeholder="Please input password"
    show-password
  />
</template>
