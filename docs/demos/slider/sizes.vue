<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(40)
</script>

<template>
  <fz-slider v-model="value" show-input size="large" />
  <fz-slider v-model="value" show-input />
  <fz-slider v-model="value" show-input size="small" />
</template>

<style scoped>
.fz-slider {
  margin-top: 20px;
}

.fz-slider:first-child {
  margin-top: 0;
}
</style>
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
