<script lang="ts" setup>
import { ref } from 'vue'

const value1 = ref(10)
const value2 = ref(20)
const value3 = ref(30)
const value4 = ref(40)
</script>

<template>
  <div class="slider-demo-block">
    <fz-slider v-model="value1" />
  </div>
  <div class="slider-demo-block">
    <fz-slider v-model="value2" placement="bottom" />
  </div>
  <div class="slider-demo-block">
    <fz-slider v-model="value3" placement="right" />
  </div>
  <div class="slider-demo-block">
    <fz-slider v-model="value4" placement="left" />
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
