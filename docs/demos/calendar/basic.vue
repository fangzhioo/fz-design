<script lang="ts" setup>
  const date = new Date()

  const handleChange = (...arg): void => {
    console.log(arg)
  }
</script>

<template>
  <fz-calendar v-model:date="date" @change="handleChange" />
</template>
