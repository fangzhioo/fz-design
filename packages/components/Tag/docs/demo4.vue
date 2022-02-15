<template>
  <fz-row>
    <fz-tag class="ml-2" size="large">Large</fz-tag>
    <fz-tag class="ml-2">Default</fz-tag>
    <fz-tag class="ml-2" size="small">Small</fz-tag>
  </fz-row>

  <fz-row class="mt-4">
    <fz-tag class="ml-2" size="large" closable>Large</fz-tag>
    <fz-tag class="ml-2" closable>Default</fz-tag>
    <fz-tag class="ml-2" size="small" closable>Small</fz-tag>
  </fz-row>
</template>

<style lang="less" scoped>
.ml-2 {
  margin-left: 6px;
}
.mt-4 {
  margin-top: 4px;
}
</style>
