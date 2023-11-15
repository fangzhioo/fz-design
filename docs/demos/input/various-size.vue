<script lang="ts" setup>
import { ref } from 'vue'
import { IconSearch } from '@fz-design/fz-design-icon'
const input1 = ref('')
const input2 = ref('')
const input3 = ref('')
</script>

<template>
  <div class="demo-input-size">
    <fz-input
      v-model="input1"
      class="w-50 m-2"
      size="large"
      placeholder="Please Input"
    />
    <fz-input v-model="input2" class="w-50 m-2" placeholder="Please Input" />
    <fz-input
      v-model="input3"
      class="w-50 m-2"
      size="small"
      placeholder="Please Input"
    />
  </div>
  <div class="demo-input-size">
    <fz-input
      v-model="input1"
      class="w-50 m-2"
      size="large"
      placeholder="Please Input"
      :suffix-icon="IconSearch"
    />
    <fz-input
      v-model="input2"
      class="w-50 m-2"
      placeholder="Please Input"
      :suffix-icon="IconSearch"
    />
    <fz-input
      v-model="input3"
      class="w-50 m-2"
      size="small"
      placeholder="Please Input"
      :suffix-icon="IconSearch"
    />
  </div>
  <div class="demo-input-size">
    <fz-input
      v-model="input1"
      class="w-50 m-2"
      size="large"
      placeholder="Please Input"
      :prefix-icon="IconSearch"
    />
    <fz-input
      v-model="input2"
      class="w-50 m-2"
      placeholder="Please Input"
      :prefix-icon="IconSearch"
    />
    <fz-input
      v-model="input3"
      class="w-50 m-2"
      size="small"
      placeholder="Please Input"
      :prefix-icon="IconSearch"
    />
  </div>
</template>

<style scoped>
.w-50{
  width: 160px;
} 
.m-2{
  margin: 8px;
}
</style>
