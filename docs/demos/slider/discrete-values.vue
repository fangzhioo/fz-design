<script lang="ts" setup>
import { ref } from 'vue'

const value1 = ref(20)
const value2 = ref(40)
</script>

<template>
  <div class="slider-demo-block">
    <span class="demonstration">隐藏步长点</span>
    <fz-slider v-model="value1" :step="10" />
  </div>
  <div class="slider-demo-block">
    <span class="demonstration">显示步长点</span>
    <fz-slider v-model="value2" :step="10" show-stops />
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
.slider-demo-block .demonstration {
  font-size: 14px;
  color: var(--fz-text-color-secondary);
  line-height: 44px;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 0;
}
.slider-demo-block .demonstration + .fz-slider {
  flex: 0 0 70%;
}
</style>
