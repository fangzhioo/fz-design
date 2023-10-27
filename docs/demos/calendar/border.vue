<script lang="ts" setup>
  const date = new Date()
</script>

<template>
  <fz-calendar v-model:date="date" border />
</template>
