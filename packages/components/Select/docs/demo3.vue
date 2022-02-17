<template>
  <div>
    <fz-select v-model="value1" multiple placeholder="Select" class="m-2">
      <fz-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </fz-option>
    </fz-select>

    <fz-select v-model="value2" multiple collapse-tags placeholder="Select" class="m-2">
      <fz-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </fz-option>
    </fz-select>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value1 = ref([]);
const value2 = ref([]);
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
