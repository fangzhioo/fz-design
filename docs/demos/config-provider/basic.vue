<script lang="ts" setup>
  import { useTheme, locale as lang } from 'fz-design'
  import { ref } from 'vue'
  import { IconSun, IconMoon } from '@fz-design/fz-design-icon'

  const theme = useTheme() // 'dark' | 'light'
  const isLight = ref<boolean>(theme.value !== 'dark')
  const size = ref('default') // '' | 'small' | 'default' | 'large'
  const { zhCn, enUs } = lang
  const locale = ref(zhCn)
  const localeName = ref<string | undefined>('zhCn')
  const locales = [
    { name: 'zhCn', lang: zhCn },
    { name: 'enUs', lang: enUs }
  ]

  const toggleTheme = (value: boolean): void => {
    theme.value = value ? 'dark' : 'light'
  }

  const handleChangeSize = (s: string): void => {
    size.value = s
  }

  const handleChangeLang = (val: string): void => {
    const { lang, name } = locales.find(i => i.name === val) || {}
    if (lang || name) {
      locale.value = lang
      localeName.value = name
    }
  }
</script>

<template>
  <div>
    <fz-config-provider :theme="theme" :size="size" :locale="locale">
      <div class="my-4">
        <span>当前页面主题：</span>
        <fz-swap
          v-model="isLight"
          :size="24"
          :icon-on="IconSun"
          :icon-off="IconMoon"
          @change="toggleTheme"
        />
      </div>

      <div class="my-4">
        <span>当前组件大小： </span>
        <fz-radio-group v-model="size" @change="handleChangeSize">
          <fz-radio
            v-for="item in ['small', 'default', 'large']"
            :key="item"
            :label="item"
          >
            {{ item }}
          </fz-radio>
        </fz-radio-group>
      </div>

      <div class="my-4">
        <span>当前语言：</span>
        <fz-radio-group v-model="localeName" @change="handleChangeLang">
          <fz-radio v-for="item in locales" :key="item.name" :label="item.name">
            {{ item.name }}
          </fz-radio>
        </fz-radio-group>
      </div>

      <!-- 示例 -->
      <fz-divider>组件展示</fz-divider>

      <fz-space direction="vertical" fill wrap>
        <fz-button>我是按钮</fz-button>

        <fz-input placeholder="我是输入框" />

        <fz-empty />
      </fz-space>
    </fz-config-provider>
  </div>
</template>

<style>
  .my-4 {
    margin-bottom: 16px;
    margin-top: 16px;
  }
</style>
