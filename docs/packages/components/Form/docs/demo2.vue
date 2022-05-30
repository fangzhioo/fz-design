<template>
  <fz-form :inline="true" :model="formInline" class="demo-form-inline">
    <fz-form-item label="Approved by">
      <fz-input v-model="formInline.user" placeholder="Approved by" />
    </fz-form-item>
    <fz-form-item label="Activity zone">
      <fz-select v-model="formInline.region" placeholder="Activity zone">
        <fz-option label="Zone one" value="shanghai" />
        <fz-option label="Zone two" value="beijing" />
      </fz-select>
    </fz-form-item>
    <fz-form-item>
      <fz-button type="primary" @click="onSubmit">Query</fz-button>
    </fz-form-item>
  </fz-form>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';

const formInline = reactive({
  user: '',
  region: '',
});

const onSubmit = () => {
  console.log('submit!');
};
</script>
