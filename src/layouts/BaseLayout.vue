<template>
  <fz-container class="base-layout">
    <fz-header class="base-header">
      <router-link to="/guide">guide</router-link>
      <router-link to="/components">components</router-link>
      <router-link to="/changelog">changelog</router-link>
    </fz-header>
    <fz-main>
      <router-view></router-view>
    </fz-main>
    <fz-footer class="base-footer"> 版权©️ xxxxxxx </fz-footer>
  </fz-container>
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
.base-header {
  box-shadow: var(--fz-box-shadow-light);
}
.base-footer {
  border-top: var(--fz-border-base, 1px solid #666);
  text-align: center;
  line-height: 60px;
}
</style>
