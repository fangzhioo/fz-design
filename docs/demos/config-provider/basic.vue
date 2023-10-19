<script lang="ts">
  import { useTheme, locale as lang } from 'fz-design'
  import { defineComponent, ref } from 'vue'

  export default defineComponent({
    setup () {
      const theme = useTheme() // 'dark' | 'light'
      const size = ref('default') // '' | 'small' | 'default' | 'large'
      const day = ref(new Date())
      const { zhCn, enUs } = lang;
      const locale = ref(zhCn)
      const localeName = ref('zhCn')
      const locales = [
        { name: 'zhCn', lang: zhCn },
        { name: 'enUs', lang: enUs }
      ]

      const toggleTheme = (): void => {
        theme.value = theme.value === 'light' ? 'dark' : 'light'
      }

      const handleChangeSize = (s: string): void => {
        size.value = s
      }

      const handleChangeLang = ({ lang, name }): void => {
        locale.value = lang
        localeName.value = name
      }

      return {
        theme,
        size,
        locale,
        localeName,
        locales,
        day,

        toggleTheme,
        handleChangeSize,
        handleChangeLang
      }
    }
  })
</script>

<template>
  <div>
    <fz-config-provider :theme="theme" :size="size" :locale="locale">
      <div>当前页面主题： {{ theme }}</div>
      <fz-button @click="toggleTheme">{{ theme }}</fz-button>

      <div>当前组件大小： {{ size }}</div>
      <fz-button-group>
        <fz-button @click="handleChangeSize('small')">small</fz-button>
        <fz-button @click="handleChangeSize('default')">default</fz-button>
        <fz-button @click="handleChangeSize('large')">large</fz-button>
      </fz-button-group>

      <div>当前语言：{{ localeName }}</div>
      <fz-button-group>
        <fz-button
          v-for="item in locales"
          :key="item.name"
          @click="handleChangeLang(item)"
        >
          {{ item.name }}
        </fz-button>
      </fz-button-group>
      <fz-calendar v-model="day" />
    </fz-config-provider>
  </div>
</template>
