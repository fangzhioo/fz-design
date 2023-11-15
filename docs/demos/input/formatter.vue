<script lang="ts" setup>
  import { ref } from 'vue'
  const input = ref('')

  const formatter = (value: string | undefined): string => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  const parser = (value: string): string => value.replace(/\$\s?|(,*)/g, '')
</script>

<template>
  <fz-input
    v-model="input"
    placeholder="Please input"
    :formatter="formatter"
    :parser="parser"
  />
</template>
