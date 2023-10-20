<script setup lang="ts">
import { ref } from 'vue'
import { IconCheck, IconX } from '@fz-design/fz-design-icon'
const value1 = ref(true)
const value2 = ref(true)
</script>

<template>
  <fz-switch v-model="value1" :active-icon="IconCheck" :inactive-icon="IconX" />
  <br />
  <fz-switch
    v-model="value2"
    class="mt-2"
    style="margin-left: 24px"
    inline-prompt
    :active-icon="IconCheck"
    :inactive-icon="IconX"
  />
</template>

<style scoped>
.ml-2 {
  margin-left: 8px;
}
</style>
