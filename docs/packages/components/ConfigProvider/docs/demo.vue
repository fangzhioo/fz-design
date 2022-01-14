<template>
  <div>
    <fz-config-provider :theme="theme" :size="size">
      <div>当前页面主题： {{ theme }}</div>
      <fz-button @click="toggleTheme">{{ theme }}</fz-button>

      <div>当前组件大小： {{ size }}</div>
      <fz-button-group>
        <fz-button @click="handleChangeSize('mini')">mini</fz-button>
        <fz-button @click="handleChangeSize('small')">small</fz-button>
        <fz-button @click="handleChangeSize('medium')">medium</fz-button>
        <fz-button @click="handleChangeSize('large')">large</fz-button>
      </fz-button-group>

      <div>val</div>
      <fz-input placeholder="请输入" v-model="val"></fz-input>
    </fz-config-provider>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const isDarkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = ref(isDarkTheme ? 'dark' : 'light'); // 'dark' | 'light'
    const size = ref('medium'); // 'mini' | 'small' | 'medium' | 'large'
    const val = ref('fzui');

    const toggleTheme = () => {
      theme.value = theme.value === 'light' ? 'dark' : 'light';
    };

    const handleChangeSize = (s) => {
      size.value = s;
    };

    return {
      theme,
      size,
      val,

      toggleTheme,
      handleChangeSize,
    };
  },
});
</script>
