<script lang="ts" setup>
import { ref } from 'vue'

const value = ref([4, 8])
</script>

<template>
  <div class="slider-demo-block">
    <fz-slider v-model="value" range show-stops :max="10" />
  </div>
</template>
<style scoped>
.slider-demo-block {
  display: flex;
  align-items: center;
}
.slider-demo-block .fz-slider {
  margin-top: 0;
  margin-left: 12px;
}
</style>
