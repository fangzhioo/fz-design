<script lang="ts" setup>
import { ref } from 'vue'

const value1 = ref(true)
const value2 = ref(true)
</script>

<template>
  <fz-switch v-model="value1" />
  <fz-switch
    v-model="value2"
    class="ml-2"
    style="--fz-switch-on-color: #13ce66; --fz-switch-off-color: #ff4949"
  />
</template>

<style scoped>
.ml-2 {
  margin-left: 8px;
}
</style>
