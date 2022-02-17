<template>
  <fz-select v-model="value" class="m-2" placeholder="Select" size="large">
    <fz-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </fz-option>
  </fz-select>
  <fz-select v-model="value" class="m-2" placeholder="Select">
    <fz-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </fz-option>
  </fz-select>
  <fz-select v-model="value" class="m-2" placeholder="Select" size="small">
    <fz-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </fz-option>
  </fz-select>
  <fz-select v-model="value" class="m-2" placeholder="Select" size="mini">
    <fz-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </fz-option>
  </fz-select>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref('');

const options = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
];
</script>

<style lang="less" scoped>
.m-2 {
  margin: 6px;
}
</style>
