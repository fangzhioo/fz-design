<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(3)
</script>

<template>
  <fz-rate v-model="value" clearable />
</template>
