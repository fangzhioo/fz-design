<script lang="ts" setup>
import { ref } from 'vue'
const input = ref('')
</script>

<template>
  <fz-input v-model="input" disabled placeholder="Please input" />
</template>
