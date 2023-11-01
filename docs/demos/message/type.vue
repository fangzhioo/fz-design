<script setup lang="ts">
  import { FzMessage } from 'fz-design'

  const openMessage = (): void => {
    FzMessage('这是一条消息提示')
  }

  const openMessagePrimary = (): void => {
    FzMessage.primary('这是一条重要消息提示')
  }

  const openMessageSuccess = (): void => {
    FzMessage.success('这是一条成功消息提示')
  }

  const openMessageInfo = (): void => {
    FzMessage.info('这是一条简单消息提示')
  }
  
  const openMessageWarning = (): void => {
    FzMessage.warning('这是一条警告消息提示')
  }

  const openMessageDanger = (): void => {
    FzMessage.error('这是一条失败消息提示')
  }
</script>

<template>
  <fz-space>
    <fz-button @click="openMessage">default</fz-button>
    <fz-button type="primary" @click="openMessagePrimary">primary</fz-button>
    <fz-button type="success" @click="openMessageSuccess">success</fz-button>
    <fz-button type="info" @click="openMessageInfo">info</fz-button>
    <fz-button type="warning" @click="openMessageWarning">warning</fz-button>
    <fz-button type="error" @click="openMessageDanger">error</fz-button>
  </fz-space>
</template>
