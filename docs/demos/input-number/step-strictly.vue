<script lang="ts" setup>
import { ref } from 'vue'

const num = ref(2)
</script>

<template>
  <fz-input-number v-model="num" :step="2" step-strictly />
</template>
