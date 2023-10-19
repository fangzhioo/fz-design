<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(null)
</script>

<template>
  <fz-rate v-model="value" size="large" />
  <br />
  <fz-rate v-model="value" />
  <br />
  <fz-rate v-model="value" size="small" />
</template>
