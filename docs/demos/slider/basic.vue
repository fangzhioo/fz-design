<script lang="ts" setup>
import { ref } from 'vue'

const value1 = ref(undefined)
const value2 = ref(30)
const value3 = ref(40)
const value4 = ref(50)
const value5 = ref(60)

const formatTooltip = (val: number): number => {
  return val / 100
}
</script>

<template>
  <div class="slider-demo-block">
    <span class="demonstration">默认值</span>
    <fz-slider v-model="value1" />
  </div>
  <div class="slider-demo-block">
    <span class="demonstration">自定义初始值</span>
    <fz-slider v-model="value2" />
  </div>
  <div class="slider-demo-block">
    <span class="demonstration">隐藏 Tooltip</span>
    <fz-slider v-model="value3" :show-tooltip="false" />
  </div>
  <div class="slider-demo-block">
    <span class="demonstration">格式化 Tooltip</span>
    <fz-slider v-model="value4" :format-tooltip="formatTooltip" />
  </div>
  <div class="slider-demo-block">
    <span class="demonstration">禁用</span>
    <fz-slider v-model="value5" disabled />
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
