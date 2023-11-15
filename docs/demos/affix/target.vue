<template>
  <div class="affix-container">
    <fz-affix target=".affix-container" :offset="80">
      <fz-button type="primary">Target container</fz-button>
    </fz-affix>
  </div>
</template>
<style scoped>
  .affix-container {
    text-align: center;
    height: 400px;
    border-radius: 4px;
    background: var(--fz-color-primary-light-9);
  }
</style>
