<script setup lang="ts">
  import { ref } from 'vue'
  import { IconSun, IconMoon, IconSmile, IconFrown } from '@fz-design/fz-design-icon';

  const open1 = ref(false)
  const open2 = ref(false)
  const open3 = ref(false)
</script>

<template>
  <fz-swap v-model="open1" :size="30" />
  <fz-swap v-model="open2" :size="30" type="sound" :icon-on="IconSun" :icon-off="IconMoon" />
  <fz-swap
    v-model="open3"
    type="swap"
    :size="30"
    :icon-on="IconSmile"
    :icon-off="IconFrown"
  />
</template>

<style scoped>
.fz-swap {
    margin-right: 20px;
}
</style>
