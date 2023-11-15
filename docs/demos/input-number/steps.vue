<script lang="ts" setup>
import { ref } from 'vue'

const num = ref(5)
</script>

<template>
  <fz-input-number v-model="num" :step="2" />
</template>
