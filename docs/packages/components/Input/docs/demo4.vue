<template>
  <div class="demo-input-size">
    <fz-input v-model="input1" class="w-50 m-2" size="large" placeholder="Please Input" />
    <fz-input v-model="input2" class="w-50 m-2" placeholder="Please Input" />
    <fz-input v-model="input3" class="w-50 m-2" size="small" placeholder="Please Input" />
    <fz-input v-model="input4" class="w-50 m-2" size="mini" placeholder="Please Input" />
  </div>
  <div class="demo-input-size">
    <fz-input v-model="input1" class="w-50 m-2" size="large" placeholder="Please Input" prefix-icon="search" />
    <fz-input v-model="input2" class="w-50 m-2" placeholder="Please Input" suffix-icon="search" />
    <fz-input v-model="input3" class="w-50 m-2" size="small" placeholder="Please Input" prefix-icon="search" />
    <fz-input v-model="input4" class="w-50 m-2" size="mini" placeholder="Please Input" prefix-icon="search" />
  </div>
  <div class="demo-input-size">
    <fz-input v-model="input1" class="w-50 m-2" size="large" placeholder="Please Input" prefix-icon="search" />
    <fz-input v-model="input2" class="w-50 m-2" placeholder="Please Input" prefix-icon="search" />
    <fz-input v-model="input3" class="w-50 m-2" size="small" placeholder="Please Input" prefix-icon="search" />
    <fz-input v-model="input4" class="w-50 m-2" size="mini" placeholder="Please Input" prefix-icon="search" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const input1 = ref('');
const input2 = ref('');
const input3 = ref('');
const input4 = ref('');
</script>

<style scoped>
.w-50 {
  width: 150px;
}
.m-2 {
  margin: 8px;
}
</style>
