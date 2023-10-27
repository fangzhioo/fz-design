<script lang="ts" setup>
  import { reactive, toRefs } from 'vue'

  const state = reactive({
    fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
    url: 'https://picx.zhimg.com/80/v2-f73ed744fca5c0269fb73e164b780021_1440w.webp?source=1940ef5c'
  })

  const { fits, url } = toRefs(state)
</script>
<template>
  <div class="demo-fit">
    <div v-for="fit in fits" :key="fit" class="block">
      <span class="title">{{ fit }}</span>
      <fz-avatar shape="square" :size="100" :fit="fit" :src="url" />
    </div>
  </div>
</template>

<style scoped>
  .demo-fit {
    display: flex;
    text-align: center;
    justify-content: space-between;
  }
  .demo-fit .block {
    flex: 1;
    display: flex;
    flex-direction: column;
    flex-grow: 0;
  }

  .demo-fit .title {
    margin-bottom: 10px;
    font-size: 14px;
    color: var(--fz-text-color-secondary);
  }
</style>
