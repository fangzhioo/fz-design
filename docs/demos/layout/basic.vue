<template>
  <fz-row>
    <fz-col :span="24"><div class="grid-content ep-bg-purple-dark" /></fz-col>
  </fz-row>
  <fz-row>
    <fz-col :span="12"><div class="grid-content ep-bg-purple" /></fz-col>
    <fz-col :span="12"><div class="grid-content ep-bg-purple-light" /></fz-col>
  </fz-row>
  <fz-row>
    <fz-col :span="8"><div class="grid-content ep-bg-purple" /></fz-col>
    <fz-col :span="8"><div class="grid-content ep-bg-purple-light" /></fz-col>
    <fz-col :span="8"><div class="grid-content ep-bg-purple" /></fz-col>
  </fz-row>
  <fz-row>
    <fz-col :span="6"><div class="grid-content ep-bg-purple" /></fz-col>
    <fz-col :span="6"><div class="grid-content ep-bg-purple-light" /></fz-col>
    <fz-col :span="6"><div class="grid-content ep-bg-purple" /></fz-col>
    <fz-col :span="6"><div class="grid-content ep-bg-purple-light" /></fz-col>
  </fz-row>
  <fz-row>
    <fz-col :span="4"><div class="grid-content ep-bg-purple" /></fz-col>
    <fz-col :span="4"><div class="grid-content ep-bg-purple-light" /></fz-col>
    <fz-col :span="4"><div class="grid-content ep-bg-purple" /></fz-col>
    <fz-col :span="4"><div class="grid-content ep-bg-purple-light" /></fz-col>
    <fz-col :span="4"><div class="grid-content ep-bg-purple" /></fz-col>
    <fz-col :span="4"><div class="grid-content ep-bg-purple-light" /></fz-col>
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
