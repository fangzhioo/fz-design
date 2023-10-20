<script lang="ts" setup>
import { ref } from 'vue'

const value1 = ref(false)
const value2 = ref(false)
const loading1 = ref(false)
const loading2 = ref(false)

const beforeChange1 = (): Promise<boolean> => {
  loading1.value = true
  return new Promise((resolve) => {
    setTimeout(() => {
      loading1.value = false
      // Message.success('Switch success')
      alert('Switch success')
      return resolve(true)
    }, 1000)
  })
}

const beforeChange2 = (): Promise<boolean> => {
  loading2.value = true
  return new Promise((_, reject) => {
    setTimeout(() => {
      loading2.value = false
      // Message.error('Switch failed')
      alert('Switch failed')
      return reject(new Error('Error'))
    }, 1000)
  })
}
</script>
<template>
  <fz-switch
    v-model="value1"
    :loading="loading1"
    :before-change="beforeChange1"
  />
  <fz-switch
    v-model="value2"
    class="ml-2"
    :loading="loading2"
    :before-change="beforeChange2"
  />
</template>

<style scoped>
.ml-2 {
  margin-left: 8px;
}
</style>
