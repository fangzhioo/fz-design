<script setup lang="ts">
import { ref } from 'vue'
import { IconBell, IconBellOff } from '@fz-design/fz-design-icon'
const value1 = ref(true)
</script>

<template>
  <fz-switch
    v-model="value1"
    :active-action-icon="IconBell"
    :inactive-action-icon="IconBellOff"
  />
</template>
