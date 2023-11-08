<script lang="ts" setup>
  import { ref } from 'vue'

  const loading = ref(true)
  const svg = `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `
</script>

<template>
  <div
    v-loading="loading"
    element-loading-text="Loading..."
    :element-loading-spinner="svg"
    element-loading-svg-view-box="-10, -10, 50, 50"
    element-loading-background="rgba(122, 122, 122, 0.8)"
    class="box"
  >
    box 1
  </div>
  <div
    v-loading="loading"
    :element-loading-svg="svg"
    element-loading-svg-view-box="-10, -10, 50, 50"
    class="box"
  >
    box 2
  </div>
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
