<template>
  <fz-row class="row-bg">
    <fz-col :span="6"><div class="grid-content ep-bg-purple" /></fz-col>
    <fz-col :span="6"><div class="grid-content ep-bg-purple-light" /></fz-col>
    <fz-col :span="6"><div class="grid-content ep-bg-purple" /></fz-col>
  </fz-row>
  <fz-row class="row-bg" justify="center">
    <fz-col :span="6"><div class="grid-content ep-bg-purple" /></fz-col>
    <fz-col :span="6"><div class="grid-content ep-bg-purple-light" /></fz-col>
    <fz-col :span="6"><div class="grid-content ep-bg-purple" /></fz-col>
  </fz-row>
  <fz-row class="row-bg" justify="end">
    <fz-col :span="6"><div class="grid-content ep-bg-purple" /></fz-col>
    <fz-col :span="6"><div class="grid-content ep-bg-purple-light" /></fz-col>
    <fz-col :span="6"><div class="grid-content ep-bg-purple" /></fz-col>
  </fz-row>
  <fz-row class="row-bg" justify="space-between">
    <fz-col :span="6"><div class="grid-content ep-bg-purple" /></fz-col>
    <fz-col :span="6"><div class="grid-content ep-bg-purple-light" /></fz-col>
    <fz-col :span="6"><div class="grid-content ep-bg-purple" /></fz-col>
  </fz-row>
  <fz-row class="row-bg" justify="space-around">
    <fz-col :span="6"><div class="grid-content ep-bg-purple" /></fz-col>
    <fz-col :span="6"><div class="grid-content ep-bg-purple-light" /></fz-col>
    <fz-col :span="6"><div class="grid-content ep-bg-purple" /></fz-col>
  </fz-row>
  <fz-row class="row-bg" justify="space-evenly">
    <fz-col :span="6"><div class="grid-content ep-bg-purple" /></fz-col>
    <fz-col :span="6"><div class="grid-content ep-bg-purple-light" /></fz-col>
    <fz-col :span="6"><div class="grid-content ep-bg-purple" /></fz-col>
  </fz-row>
</template>

<style scoped>
  .fz-row {
    margin-bottom: 20px;
  }
  .fz-row:last-child {
    margin-bottom: 0;
  }
  .fz-col {
    border-radius: 4px;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  .row-bg {
    padding: 10px 0;
    background-color: var(--fz-fill-color-extra-light);
  }

  .ep-bg-purple-dark {
    background: var(--fz-color-primary-light-3);
  }

  .ep-bg-purple {
    background: var(--fz-color-primary-light-7);
  }

  .ep-bg-purple-light {
    background: var(--fz-color-primary-light-9);
  }
</style>
