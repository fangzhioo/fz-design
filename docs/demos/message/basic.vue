<script lang="ts" setup>
  import { FzMessage } from 'fz-design'

  const openMessage = (): void => {
    FzMessage('这是一条消息提示')
  }
</script>

<template>
  <fz-button type="primary" @click="openMessage">打开</fz-button>
</template>
