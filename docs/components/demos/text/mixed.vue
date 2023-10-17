<script lang="ts" setup>
import { IconBell, IconCpu } from '@fz-design/fz-design-icon'
</script>

<template>
  <fz-space direction="vertical">
    <fz-text>
      <fz-svg-icon :icon="IconCpu" />
      FzDesign
    </fz-text>
    <fz-row>
      <fz-text>Rate</fz-text>
      <fz-rate class="ml-1" />
    </fz-row>
    <fz-text>
      This is text mixed icon
      <fz-svg-icon :icon="IconBell" />
      and component
      <fz-button>Button</fz-button>
    </fz-text>
  </fz-space>
</template>

<style scoped>
.ml-1 {
  margin-left: 4px;
}
</style>
