<script lang="ts" setup>
import { h, ref } from 'vue'

const size = ref(10)
const spacer = h('div', { style: { 'margin': '0 2px' } }, ['|'])
</script>

<template>
  <fz-space :size="size" :spacer="spacer">
    <div v-for="i in 2" :key="i">
      <fz-button> button {{ i }} </fz-button>
    </div>
  </fz-space>
</template>
