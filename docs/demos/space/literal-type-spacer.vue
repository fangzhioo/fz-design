<script lang="ts" setup>
import { ref } from 'vue'

const size = ref(10)
</script>

<template>
  <fz-space :size="size" spacer="|">
    <div v-for="i in 2" :key="i">
      <fz-button> button {{ i }} </fz-button>
    </div>
  </fz-space>
</template>
