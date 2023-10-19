<template>
  <fz-row :gutter="10">
    <fz-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
      <div class="grid-content ep-bg-purple" />
    </fz-col>
    <fz-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
      <div class="grid-content ep-bg-purple-light" />
    </fz-col>
    <fz-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
      <div class="grid-content ep-bg-purple" />
    </fz-col>
    <fz-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
      <div class="grid-content ep-bg-purple-light" />
    </fz-col>
  </fz-row>
</template>

<style scoped>
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
