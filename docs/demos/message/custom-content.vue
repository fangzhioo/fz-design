<script lang="ts" setup>
  import { h } from 'vue'
  import { FzMessage } from 'fz-design'

  const openMessageVNode = (): void => {
    FzMessage({
      message: h('div', [
        h('p', [h('span', '这是一条'), h('b', ' 非常重要 '), h('span', '的消息提示')]),
        h('p', '这里是一些不重要的内容')
      ]),
      type: 'primary'
    })
  }
</script>

<template>
  <fz-button type="primary" @click="openMessageVNode">打开</fz-button>
</template>
