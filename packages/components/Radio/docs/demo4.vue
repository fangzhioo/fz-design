<template>
  <div>
    <fz-radio v-model="radio1" label="1" size="large" border>Option A</fz-radio>
    <fz-radio v-model="radio1" label="2" size="large" border>Option B</fz-radio>
  </div>
  <div style="margin-top: 20px">
    <fz-radio v-model="radio2" label="1" border>Option A</fz-radio>
    <fz-radio v-model="radio2" label="2" border>Option B</fz-radio>
  </div>
  <div style="margin-top: 20px">
    <fz-radio-group v-model="radio3" size="small">
      <fz-radio label="1" border>Option A</fz-radio>
      <fz-radio label="2" border disabled>Option B</fz-radio>
    </fz-radio-group>
  </div>
  <div style="margin-top: 20px">
    <fz-radio-group v-model="radio4" size="small" disabled>
      <fz-radio label="1" border>Option A</fz-radio>
      <fz-radio label="2" border>Option B</fz-radio>
    </fz-radio-group>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const radio1 = ref('1');
const radio2 = ref('1');
const radio3 = ref('1');
const radio4 = ref('1');
</script>
