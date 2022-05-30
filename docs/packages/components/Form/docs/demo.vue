<template>
  <fz-form :model="form" label-width="120px">
    <fz-form-item label="Activity name">
      <fz-input v-model="form.name" placeholder="Activity name" />
    </fz-form-item>
    <fz-form-item label="Activity zone">
      <fz-select v-model="form.region" placeholder="please select your zone">
        <fz-option label="Zone one" value="shanghai" />
        <fz-option label="Zone two" value="beijing" />
      </fz-select>
    </fz-form-item>
    <fz-form-item label="Activity time">
      <fz-col :span="11">
        <fz-date-picker v-model="form.date1" type="date" placeholder="Pick a date" style="width: 100%" />
      </fz-col>
      <fz-col :span="2" class="text-center">
        <span class="text-gray-500">-</span>
      </fz-col>
      <fz-col :span="11">
        <fz-time-picker v-model="form.date2" placeholder="Pick a time" style="width: 100%" />
      </fz-col>
    </fz-form-item>
    <fz-form-item label="Instant delivery">
      <fz-switch v-model="form.delivery" />
    </fz-form-item>
    <fz-form-item label="Activity type">
      <fz-checkbox-group v-model="form.type">
        <fz-checkbox label="Online activities" name="type" />
        <fz-checkbox label="Promotion activities" name="type" />
        <fz-checkbox label="Offline activities" name="type" />
        <fz-checkbox label="Simple brand exposure" name="type" />
      </fz-checkbox-group>
    </fz-form-item>
    <fz-form-item label="Resources">
      <fz-radio-group v-model="form.resource">
        <fz-radio label="Sponsor" />
        <fz-radio label="Venue" />
      </fz-radio-group>
    </fz-form-item>
    <fz-form-item label="Activity form">
      <fz-input v-model="form.desc" type="textarea" placeholder="desc" />
    </fz-form-item>
    <fz-form-item>
      <fz-button type="primary" @click="onSubmit">Create</fz-button>
      <fz-button>Cancel</fz-button>
    </fz-form-item>
  </fz-form>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';

// do not use same name with ref
const form = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
});

const onSubmit = () => {
  console.log('submit!', form);
};
</script>

<style scoped>
.text-center {
  text-align: center;
}
</style>
