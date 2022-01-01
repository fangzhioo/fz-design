<template>
  <div class="base-layout">
    <nav class="base-header">
      <router-link to="/guide">guide</router-link>
      <router-link to="/components">components</router-link>
      <router-link to="/changelog">changelog</router-link>
    </nav>
    <main class="base-main">
      <router-view></router-view>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'baseLayout',
  setup(props, context) {
    return {};
  },
});
</script>

<style scoped lang="less">
.base-layout {
  height: 100vh;
  display: flex;
  flex-direction: column;
  .base-header {
    height: 60px;
    min-height: 60px;
    margin-bottom: 10px;
    border-bottom: 1px solid #eee;
  }
  .base-main {
    flex: 1;
  }
}
</style>
