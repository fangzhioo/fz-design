<template>
  <div class="avatar-demo-container">
    <fz-avatar shape="square" size="large" :src="srcUrl" />
    <fz-avatar shape="square" size="medium" :src="srcUrl" />
    <fz-avatar shape="square" size="small" :src="srcUrl" />
    <fz-avatar shape="square" size="mini" :src="srcUrl" />
    <fz-avatar shape="square" :size="60" :src="srcUrl" />
    <fz-avatar shape="square" :size="40" icon="smile" />
  </div>
</template>

<script setup>
const srcUrl = 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png';
</script>

<style lang="less">
.avatar-demo-container {
  .fz-avatar {
    margin-right: 20px;
  }
}
</style>
