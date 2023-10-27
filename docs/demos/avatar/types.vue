<script setup lang="ts">
  import { IconUser } from '@fz-design/fz-design-icon'
</script>

<template>
  <div class="demo-type">
    <div>
      <fz-avatar :icon="IconUser" />
    </div>
    <div>
      <fz-avatar
        src="https://picx.zhimg.com/80/v2-f73ed744fca5c0269fb73e164b780021_1440w.webp?source=1940ef5c"
      />
    </div>
    <div>
      <fz-avatar> user </fz-avatar>
    </div>
  </div>
</template>

<style scoped>
  .demo-type {
    display: flex;
  }
  .demo-type > div {
    flex: 1;
    text-align: center;
  }

  .demo-type > div:not(:last-child) {
    border-right: 1px solid var(--fz-border-color);
  }
</style>
