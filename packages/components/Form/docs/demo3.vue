<template>
  <fz-radio-group v-model="labelPosition" label="label position">
    <fz-radio-button label="left">Left</fz-radio-button>
    <fz-radio-button label="top">Top</fz-radio-button>
  </fz-radio-group>
  <div style="margin: 20px" />
  <fz-form :label-position="labelPosition" label-width="100px" :model="formLabelAlign" style="max-width: 460px">
    <fz-form-item label="Name">
      <fz-input v-model="formLabelAlign.name" />
    </fz-form-item>
    <fz-form-item label="Activity zone">
      <fz-input v-model="formLabelAlign.region" />
    </fz-form-item>
    <fz-form-item label="Activity form">
      <fz-input v-model="formLabelAlign.type" />
    </fz-form-item>
  </fz-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';

const labelPosition = ref('left');

const formLabelAlign = reactive({
  name: '',
  region: '',
  type: '',
});
</script>
