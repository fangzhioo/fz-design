<template>
  <fz-config-provider :theme="theme" :size="size">
    <fz-container class="base-layout">
      <fz-header class="base-header">
        <div class="logo">FzUI</div>
        <nav class="nav">
          <router-link to="/guide">指南</router-link>
          <router-link to="/components">组件</router-link>
          <router-link to="/changelog">日志</router-link>
        </nav>
        <div>
          <span class="theme-btn" @click="handleToggleTheme">{{ theme }}</span>
        </div>
      </fz-header>
      <fz-main>
        <router-view />
      </fz-main>
    </fz-container>
    <fz-backtop />
  </fz-config-provider>
</template>

<script lang="ts">
import { Theme, useTheme } from '@/hooks/useTheme';
import { useSize } from '@/hooks/useSize';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'baseLayout',
  setup() {
    const ct = document.documentElement.getAttribute('data-mode') as Theme;
    const { theme, setTheme } = useTheme(ct);
    const { size } = useSize();

    const handleToggleTheme = () => {
      setTheme(theme.value === 'dark' ? 'light' : 'dark');
    };

    return {
      theme,
      size,
      handleToggleTheme,
    };
  },
});
</script>

<style scoped lang="less">
.base-header {
  box-shadow: var(--fz-box-shadow-light);
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 0 20px;

  .logo {
    width: 80px;
  }
  .nav {
    flex: 1;
    & > a {
      margin-right: 12px;
    }
  }

  .theme-btn {
    font-size: 12px;
    cursor: pointer;
    color: var(--fz-text-color-secondary, #ccc);
  }
}
</style>
