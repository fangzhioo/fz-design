<script setup lang="ts">
    import { FzMessage } from 'fz-design'
  
    const openMessageClose1 = (): void => {
      FzMessage({
        message: '这是一条5秒后消失的消息',
        type: 'primary',
        closable: true,
        duration: 5000
      })
    }
  
    const openMessageClose2 = (): void => {
      FzMessage({
        message: '这是一条不会自动消失的消息',
        type: 'primary',
        closable: true,
        closeBtn: '关闭',
        duration: 0
      })
    }
  </script>
  
<template>
  <fz-button type="primary" @click="openMessageClose1">5秒后关闭</fz-button>
  <fz-button type="primary" @click="openMessageClose2">主动关闭</fz-button>
</template>
