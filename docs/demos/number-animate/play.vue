<script lang="ts" setup>
  import { ref } from 'vue'
  import type { NumberAnimateInstance } from 'fz-design'

  const animate = ref<NumberAnimateInstance>()

  const change = (): void => {
    animate.value.run()
  }
</script>

<template>
  <fz-number-animate ref="animate" size="large" :from="0" :to="15000" />
  <fz-button type="default" @click="change">重新播放</fz-button>
</template>

<style scoped>
  .fz-number-animate {
    margin-bottom: 10px;
  }
</style>
