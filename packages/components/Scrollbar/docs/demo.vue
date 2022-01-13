<template>
  <div>
    <fz-scrollbar height="400px">
      <p v-for="item in 20" :key="item" class="scrollbar-demo-item">{{ item }}</p>
    </fz-scrollbar>
  </div>
</template>

<style lang="less">
.scrollbar-demo-item {
  height: 60px;
  line-height: 60px;
  text-align: center;
  margin-bottom: 10px;
  background-color: var(--fz-background-color-lighter, #eee);
  color: var(--fz-color-white, #66ccff);
}
</style>
