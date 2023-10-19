<script lang="ts" setup>
import { ref } from 'vue'

const value = ref()
</script>

<template>
  <fz-rate v-model="value" allow-half />
</template>
