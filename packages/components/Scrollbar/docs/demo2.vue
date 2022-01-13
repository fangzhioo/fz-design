<template>
  <fz-scrollbar>
    <div class="flex-content">
      <p v-for="item in 50" :key="item" class="scrollbar-demo-item">
        {{ item }}
      </p>
    </div>
  </fz-scrollbar>
</template>

<style lang="less" scoped>
.flex-content {
  display: flex;
}
.scrollbar-demo-item {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background-color: var(--fz-color-error-lighter);
  color: var(--fz-color-error);
}
</style>
