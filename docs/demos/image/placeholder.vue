<script lang="ts" setup>
  const src =
    'https://pic3.zhimg.com/80/v2-cea87b3d83d24e0dd550f57446b4bc06_1440w.webp'
  </script>
  
<template>
  <div class="demo-image__placeholder">
    <div class="block">
      <span class="demonstration">Default</span>
      <fz-image :src="src" />
    </div>
    <div class="block">
      <span class="demonstration">Custom</span>
      <fz-image :src="src">
        <template #placeholder>
          <div class="image-slot">Loading<span class="dot">...</span></div>
        </template>
      </fz-image>
    </div>
  </div>
</template>
  
  <style scoped>
  .demo-image__placeholder .block {
    padding: 30px 0;
    text-align: center;
    border-right: solid 1px var(--fz-border-color);
    display: inline-block;
    width: 49%;
    box-sizing: border-box;
    vertical-align: top;
  }
  .demo-image__placeholder .demonstration {
    display: block;
    color: var(--fz-text-color-secondary);
    font-size: 14px;
    margin-bottom: 20px;
  }
  .demo-image__placeholder .fz-image {
    padding: 0 5px;
    max-width: 300px;
    max-height: 200px;
  }
  
  .demo-image__placeholder.image-slot {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: var(--fz-fill-color-light);
    color: var(--fz-text-color-secondary);
    font-size: 14px;
  }
  .demo-image__placeholder .dot {
    animation: dot 2s infinite steps(3, start);
    overflow: hidden;
  }
  </style>
