<script lang="ts" setup>
import { IconBell, IconCpu } from '@fz-design/fz-design-icon'
</script>

<template>
  <fz-space direction="vertical">
    <fz-text>
      <fz-svg-icon :icon="IconCpu" />
      CPU
    </fz-text>
    <fz-space>
      <fz-text>好评</fz-text>
      <fz-rate class="ml-1" />
    </fz-space>
    <fz-text>
      文本混合了Icon
      <fz-svg-icon :icon="IconBell" />
      还有按钮
      <fz-button type="primary">确认</fz-button>
    </fz-text>
  </fz-space>
</template>

<style scoped>
.ml-1 {
  margin-left: 4px;
}
</style>
