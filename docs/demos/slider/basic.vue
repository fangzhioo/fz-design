<script lang="ts" setup>
  import { ref } from 'vue'

  const value1 = ref(50)

  const handleInput = (value: number): void => {
    console.log('input',value);
  }

  const handleChange = (value: number): void => {
    console.log('change',value);
  }
</script>

<template>
  {{ value1 }}
  <fz-slider v-model="value1" @input="handleInput" @change="handleChange" />
</template>
