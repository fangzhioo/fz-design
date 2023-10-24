<template>
  <fz-row>
    <fz-tag class="mx-1" size="large">Large</fz-tag>
    <fz-tag class="mx-1">Default</fz-tag>
    <fz-tag class="mx-1" size="small">Small</fz-tag>
  </fz-row>

  <fz-row class="mt-4">
    <fz-tag class="mx-1" size="large" closable>Large</fz-tag>
    <fz-tag class="mx-1" closable>Default</fz-tag>
    <fz-tag class="mx-1" size="small" closable>Small</fz-tag>
  </fz-row>
</template>

<style scoped>
  .mx-1 {
    margin: 0 4px;
  }
  .mt-4 {
    margin-top: 16px;
  }
</style>
