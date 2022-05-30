<template>
  <div>
    <fz-radio-group v-model="size" label="size control">
      <fz-radio-button label="large">large</fz-radio-button>
      <fz-radio-button label="medium">medium</fz-radio-button>
      <fz-radio-button label="small">small</fz-radio-button>
      <fz-radio-button label="mini">mini</fz-radio-button>
    </fz-radio-group>
    <fz-radio-group v-model="labelPosition" label="position control">
      <fz-radio-button label="left">Left</fz-radio-button>
      <fz-radio-button label="top">Top</fz-radio-button>
    </fz-radio-group>
  </div>
  <br />
  <fz-form ref="form" :model="sizeForm" label-width="auto" :label-position="labelPosition" :size="size">
    <fz-form-item label="Activity name">
      <fz-input v-model="sizeForm.name" />
    </fz-form-item>
    <fz-form-item label="Activity zone">
      <fz-select v-model="sizeForm.region" placeholder="please select your zone">
        <fz-option label="Zone one" value="shanghai" />
        <fz-option label="Zone two" value="beijing" />
      </fz-select>
    </fz-form-item>
    <fz-form-item label="Activity time">
      <fz-col :span="11">
        <fz-date-picker v-model="sizeForm.date1" type="date" label="Pick a date" placeholder="Pick a date" style="width: 100%" />
      </fz-col>
      <fz-col class="text-center" :span="1" style="margin: 0 0.5rem">-</fz-col>
      <fz-col :span="11">
        <fz-time-picker v-model="sizeForm.date2" label="Pick a time" placeholder="Pick a time" style="width: 100%" />
      </fz-col>
    </fz-form-item>
    <fz-form-item label="Activity type">
      <fz-checkbox-group v-model="sizeForm.type">
        <fz-checkbox-button label="Online activities" name="type" />
        <fz-checkbox-button label="Promotion activities" name="type" />
      </fz-checkbox-group>
    </fz-form-item>
    <fz-form-item label="Resources">
      <fz-radio-group v-model="sizeForm.resource">
        <fz-radio border label="Sponsor" />
        <fz-radio border label="Venue" />
      </fz-radio-group>
    </fz-form-item>
    <fz-form-item>
      <fz-button type="primary" @click="onSubmit">Create</fz-button>
      <fz-button>Cancel</fz-button>
    </fz-form-item>
  </fz-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';

const size = ref('medium');
const labelPosition = ref('left');

const sizeForm = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
});

function onSubmit() {
  console.log('submit!');
}
</script>

<style>
.fz-radio-group {
  margin-right: 12px;
}
</style>
