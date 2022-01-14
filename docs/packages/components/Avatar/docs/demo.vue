<template>
  <div class="avatar-demo-container">
    <fz-avatar size="large" :src="srcUrl" />
    <fz-avatar size="medium" :src="srcUrl" />
    <fz-avatar size="small" :src="srcUrl" />
    <fz-avatar size="mini" :src="srcUrl" />
    <fz-avatar :size="60" :src="srcUrl" />
    <fz-avatar :size="40" icon="smile" />
  </div>
</template>

<script setup>
const srcUrl = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png';
</script>

<style lang="less">
.avatar-demo-container {
  .fz-avatar {
    margin-right: 20px;
  }
}
</style>
