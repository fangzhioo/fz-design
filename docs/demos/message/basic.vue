<script lang="ts" setup>
  import { FzMessage } from 'fz-design'
  import { getCurrentInstance } from 'vue'

  const vm = getCurrentInstance()

  const openMessage = (): void => {
    FzMessage('这是一条消息提示')
  }

  const openMessageGlobal = (): void => {
    vm?.appContext.app.config.globalProperties.FzMessage('这是一条全局消息提示')
  }
</script>

<template>
  <fz-button type="primary" @click="openMessage">打开</fz-button>
  <fz-button type="primary" @click="openMessageGlobal">全局方法</fz-button>
</template>
