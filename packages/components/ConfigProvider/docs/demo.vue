<template>
  <div>
    <fz-config-provider :theme="theme" :size="size" :locale="locale">
      <div>当前页面主题： {{ theme }}</div>
      <fz-button @click="toggleTheme">{{ theme }}</fz-button>

      <div>当前组件大小： {{ size }}</div>
      <fz-button-group>
        <fz-button @click="handleChangeSize('mini')">mini</fz-button>
        <fz-button @click="handleChangeSize('small')">small</fz-button>
        <fz-button @click="handleChangeSize('medium')">medium</fz-button>
        <fz-button @click="handleChangeSize('large')">large</fz-button>
      </fz-button-group>

      <div>当前语言：{{ localeName }}</div>
      <fz-button-group>
        <fz-button v-for="item in locales" :key="item.name" @click="handleChangeLang(item)">{{ item.name }}</fz-button>
      </fz-button-group>
      <fz-calendar v-model="day" />
    </fz-config-provider>
  </div>
</template>

<script>
import { useTheme, zhCn, zhTw, enUs } from 'fz-ui';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const theme = useTheme(); // 'dark' | 'light'
    const size = ref('medium'); // 'mini' | 'small' | 'medium' | 'large'
    const day = ref(new Date());
    const locale1 = ref(zhCn);
    const locale2 = ref(zhTw);
    const locale3 = ref(enUs);
    const locale = ref(locale1.value);
    const localeName = ref('zhCn');
    const locales = [
      { name: 'zhCn', lang: locale1 },
      { name: 'zhTw', lang: locale2 },
      { name: 'enUs', lang: locale3 },
    ];

    const toggleTheme = () => {
      theme.value = theme.value === 'light' ? 'dark' : 'light';
    };

    const handleChangeSize = (s) => {
      size.value = s;
    };

    const handleChangeLang = ({ lang, name }) => {
      locale.value = lang.value;
      localeName.value = name;
    };

    return {
      theme,
      size,
      locale,
      localeName,
      locales,
      day,

      toggleTheme,
      handleChangeSize,
      handleChangeLang,
    };
  },
});
</script>
