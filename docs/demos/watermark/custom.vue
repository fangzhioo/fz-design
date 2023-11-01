<script setup lang="ts">
  import { reactive } from 'vue'

  const config = reactive({
    content: 'Fz Design',
    font: {
      fontSize: 16,
      color: 'rgba(0, 0, 0, 0.15)'
    },
    zIndex: -1,
    rotate: -22,
    gap: [100, 100] as [number, number],
    offset: [] as unknown as [number, number]
  })
</script>

<template>
  <div class="wrapper">
    <fz-watermark
      class="watermark"
      :content="config.content"
      :font="config.font"
      :z-index="config.zIndex"
      :rotate="config.rotate"
      :gap="config.gap"
      :offset="config.offset"
    >
      <div class="demo">
        <h1>Fz Design</h1>
        <h2>a Vue 3 based component library for designers and developers</h2>
        <img src="/images/hamburger.png" alt="示例图片" />
      </div>
    </fz-watermark>
    <fz-form class="form" :model="config" label-position="top" label-width="50px">
      <fz-form-item label="Content">
        <fz-input v-model="config.content" />
      </fz-form-item>
      <fz-form-item label="Color">
        <fz-color-picker v-model="config.font.color" show-alpha />
      </fz-form-item>
      <fz-form-item label="FontSize">
        <fz-slider v-model="config.font.fontSize" />
      </fz-form-item>
      <fz-form-item label="zIndex">
        <fz-slider v-model="config.zIndex" />
      </fz-form-item>
      <fz-form-item label="Rotate">
        <fz-slider v-model="config.rotate" :min="-180" :max="180" />
      </fz-form-item>
      <fz-form-item label="Gap">
        <fz-space>
          <fz-input-number v-model="config.gap[0]" controls-position="right" />
          <fz-input-number v-model="config.gap[1]" controls-position="right" />
        </fz-space>
      </fz-form-item>
      <fz-form-item label="Offset">
        <fz-space>
          <fz-input-number
            v-model="config.offset[0]"
            placeholder="offsetLeft"
            controls-position="right"
          />
          <fz-input-number
            v-model="config.offset[1]"
            placeholder="offsetTop"
            controls-position="right"
          />
        </fz-space>
      </fz-form-item>
    </fz-form>
  </div>
</template>

<style scoped>
  .wrapper {
    display: flex;
  }
  .watermark {
    display: flex;
    flex: auto;
  }
  .demo {
    flex: auto;
  }
  .form {
    width: 330px;
    margin-left: 20px;
    border-left: 1px solid #eee;
    padding-left: 20px;
  }

  img {
    z-index: 10;
    width: 100%;
    max-width: 300px;
    position: relative;
  }
</style>
