<script lang="ts" setup>
  const fits = ['fill', 'contain', 'cover', 'none', 'scale-down']
  const url =
    'https://pic3.zhimg.com/80/v2-cea87b3d83d24e0dd550f57446b4bc06_1440w.webp'
  </script>
  
<template>
  <div class="demo-image">
    <div v-for="fit in fits" :key="fit" class="block">
      <span class="demonstration">{{ fit }}</span>
      <fz-image style="width: 100px; height: 100px" :src="url" :fit="fit" />
    </div>
  </div>
</template>
  
  <style scoped>
  .demo-image .block {
    padding: 30px 0;
    text-align: center;
    border-right: solid 1px var(--fz-border-color);
    display: inline-block;
    width: 20%;
    box-sizing: border-box;
    vertical-align: top;
  }
  .demo-image .block:last-child {
    border-right: none;
  }
  .demo-image .demonstration {
    display: block;
    color: var(--fz-text-color-secondary);
    font-size: 14px;
    margin-bottom: 20px;
  }
  </style>
