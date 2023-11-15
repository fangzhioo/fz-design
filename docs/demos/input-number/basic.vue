<script lang="ts" setup>
import { ref } from 'vue'

const num = ref(1)
const handleChange = (value: number): void => {
  console.log(value)
}
</script>

<template>
  <fz-input-number v-model="num" :min="1" :max="10" placeholder="请输入" @change="handleChange" />
</template>
