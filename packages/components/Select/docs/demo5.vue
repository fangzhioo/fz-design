<template>
  <fz-select v-model="value" placeholder="Select">
    <fz-option-group v-for="group in options" :key="group.label" :label="group.label">
      <fz-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value"> </fz-option>
    </fz-option-group>
  </fz-select>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref('');
const options = [
  {
    label: 'Popular cities',
    options: [
      {
        value: 'Shanghai',
        label: 'Shanghai',
      },
      {
        value: 'Beijing',
        label: 'Beijing',
      },
    ],
  },
  {
    label: 'City name',
    options: [
      {
        value: 'Chengdu',
        label: 'Chengdu',
      },
      {
        value: 'Shenzhen',
        label: 'Shenzhen',
      },
      {
        value: 'Guangzhou',
        label: 'Guangzhou',
      },
      {
        value: 'Dalian',
        label: 'Dalian',
      },
    ],
  },
];
</script>
