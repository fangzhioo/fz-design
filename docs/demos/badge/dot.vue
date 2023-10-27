<script lang="ts" setup>
import { IconShare } from '@fz-design/fz-design-icon'
</script>

<template>
  <fz-badge dot class="item">query</fz-badge>
  <fz-badge dot class="item">
    <fz-button class="share-button" :icon="IconShare" type="primary" />
  </fz-badge>
</template>

<style scoped>
.item {
  margin-top: 10px;
  margin-right: 40px;
}
</style>
