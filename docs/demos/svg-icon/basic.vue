<script lang="ts" setup>
  import { IconLoading, IconAlertCircle } from '@fz-design/fz-design-icon'
</script>

<template>
  <fz-svg-icon>
    <icon-loading />
  </fz-svg-icon>

  <fz-svg-icon color="red">
    <icon-alert-circle />
  </fz-svg-icon>

  <fz-svg-icon size="34px" :icon="IconAlertCircle" />
</template>

<style scoped>
  .fz-svg-icon + .fz-svg-icon {
    margin-left: 16px;
  }
</style>
