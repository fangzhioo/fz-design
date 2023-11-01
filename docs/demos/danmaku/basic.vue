<script lang="ts" setup>
  import { ref } from 'vue'

  // 弹幕数据
  const danmusMock = ref([
    '人才不火系列',
    '双厨狂喜',
    '双厨曝炸',
    '火钳留名',
    '要素过多',
    '动作也太流畅了吧',
    '世界名画',
    '好活，当赏',
    '全程高能'
  ])
</script>
<template>
  <fz-danmaku ref="danmakuRef" v-model:danmus="danmusMock" loop>
    <!-- 容器slot -->
    <div class="content-container">我是内容</div>
  </fz-danmaku>
</template>
<style scoped lang="scss">
  // 容器内容
  .content-container {
    position: relative;
    width: 100%;
    height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    background: linear-gradient(45deg, var(--fz-color-info), var(--fz-color-primary));
  }
</style>
