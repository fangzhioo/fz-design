<script setup lang="ts">
  import { FzMessage } from 'fz-design'
  import type { MessagePlacement } from 'fz-design'

  const openMessagePlacement = (placement: MessagePlacement): void => {
    FzMessage({
      message: '这是一条自定义位置的消息',
      type: 'primary',
      placement: placement
    })
  }
</script>

<template>
  <fz-space>
    <fz-button type="primary" @click="openMessagePlacement('top')">顶部</fz-button>
    <fz-button type="primary" @click="openMessagePlacement('top-left')">左上</fz-button>
    <fz-button type="primary" @click="openMessagePlacement('top-right')">右上</fz-button>
    <fz-button type="success" @click="openMessagePlacement('bottom')">底部</fz-button>
    <fz-button type="success" @click="openMessagePlacement('bottom-left')">左下</fz-button>
    <fz-button type="success" @click="openMessagePlacement('bottom-right')">右下</fz-button>
  </fz-space>
</template>
