<script setup lang="ts">
  import { IconPhone } from '@fz-design/fz-design-icon'
  </script>
  
<template>
  <div class="demo-image__error">
    <div class="block">
      <span class="demonstration">Default</span>
      <fz-image />
    </div>
    <div class="block">
      <span class="demonstration">Custom</span>
      <fz-image>
        <template #error>
          <div class="image-slot">
            <fz-svg-icon :icon="IconPhone" />
          </div>
        </template>
      </fz-image>
    </div>
  </div>
</template>
  
  <style scoped>
  .demo-image__error .block {
    padding: 30px 0;
    text-align: center;
    border-right: solid 1px var(--fz-border-color);
    display: inline-block;
    width: 49%;
    box-sizing: border-box;
    vertical-align: top;
  }
  .demo-image__error .demonstration {
    display: block;
    color: var(--fz-text-color-secondary);
    font-size: 14px;
    margin-bottom: 20px;
  }
  .demo-image__error .fz-image {
    padding: 0 5px;
    max-width: 300px;
    max-height: 200px;
    width: 100%;
    height: 200px;
  }
  
  .demo-image__error .image-slot {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: var(--fz-fill-color-light);
    color: var(--fz-text-color-secondary);
    font-size: 30px;
  }
  .demo-image__error .image-slot .fz-icon {
    font-size: 30px;
  }
  </style>
