<script lang="ts" setup>
  import { ref } from 'vue'

  const loading = ref(true)
</script>

<template>
  <div v-loading="loading" class="box">box</div>
</template>

<style scoped>
  .box {
    width: 100%;
    height: 250px;
    font-size: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--fz-fill-color-darker);
  }
</style>

<style>
  .example-preview .fz-loading-mask {
    z-index: 9;
  }
</style>
