<script lang="ts" setup>
  import { ref } from 'vue'

  const option = ref([])
</script>

<template>
  <fz-space direction="vertical" alignment="flex-start">
    <fz-checkbox-group v-model="option">
      <fz-checkbox label="🍎苹果" />
      <fz-checkbox label="🍍菠萝" />
      <fz-checkbox label="🍑桃子" />
    </fz-checkbox-group>
    <fz-checkbox-group v-model="option" disabled>
      <fz-checkbox label="🍎苹果" />
      <fz-checkbox label="🍍菠萝" />
      <fz-checkbox label="🍑桃子" />
    </fz-checkbox-group>
    <fz-checkbox-group v-model="option">
      <fz-checkbox label="🍎苹果" />
      <fz-checkbox label="🍍菠萝" disabled />
      <fz-checkbox label="🍑桃子" />
    </fz-checkbox-group>
  </fz-space>
</template>
