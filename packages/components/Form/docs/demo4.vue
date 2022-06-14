<template>
  <fz-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm" :size="formSize">
    <fz-form-item label="Activity name" prop="name">
      <fz-input v-model="ruleForm.name" />
    </fz-form-item>
    <fz-form-item label="Activity zone" prop="region">
      <fz-select v-model="ruleForm.region" placeholder="Activity zone">
        <fz-option label="Zone one" value="shanghai" />
        <fz-option label="Zone two" value="beijing" />
      </fz-select>
    </fz-form-item>
    <fz-form-item label="Activity time" required>
      <fz-col :span="11">
        <fz-form-item prop="date1">
          <fz-date-picker v-model="ruleForm.date1" type="date" label="Pick a date" placeholder="Pick a date" style="width: 100%" />
        </fz-form-item>
      </fz-col>
      <fz-col class="text-center" :span="2">
        <span class="text-gray-500">-</span>
      </fz-col>
      <fz-col :span="11">
        <fz-form-item prop="date2">
          <fz-time-picker v-model="ruleForm.date2" label="Pick a time" placeholder="Pick a time" style="width: 100%" />
        </fz-form-item>
      </fz-col>
    </fz-form-item>
    <fz-form-item label="Instant delivery" prop="delivery">
      <fz-switch v-model="ruleForm.delivery" />
    </fz-form-item>
    <fz-form-item label="Activity type" prop="type">
      <fz-checkbox-group v-model="ruleForm.type">
        <fz-checkbox label="Online activities" name="type" />
        <fz-checkbox label="Promotion activities" name="type" />
        <fz-checkbox label="Offline activities" name="type" />
        <fz-checkbox label="Simple brand exposure" name="type" />
      </fz-checkbox-group>
    </fz-form-item>
    <fz-form-item label="Resources" prop="resource">
      <fz-radio-group v-model="ruleForm.resource">
        <fz-radio label="Sponsorship" />
        <fz-radio label="Venue" />
      </fz-radio-group>
    </fz-form-item>
    <fz-form-item label="Activity form" prop="desc">
      <fz-input v-model="ruleForm.desc" type="textarea" />
    </fz-form-item>
    <fz-form-item>
      <fz-button type="primary" @click="submitForm(ruleFormRef)">Create</fz-button>
      <fz-button @click="resetForm(ruleFormRef)">Reset</fz-button>
    </fz-form-item>
  </fz-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import type { FormInstance, FormRules } from 'fz-ui';

const formSize = ref('default');
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive({
  name: 'Hello',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
});

const rules = reactive<FormRules>({
  name: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  region: [
    {
      required: true,
      message: 'Please select Activity zone',
      trigger: 'change',
    },
  ],
  date1: [
    {
      type: 'date',
      required: true,
      message: 'Please pick a date',
      trigger: 'change',
    },
  ],
  date2: [
    {
      type: 'date',
      required: true,
      message: 'Please pick a time',
      trigger: 'change',
    },
  ],
  type: [
    {
      type: 'array',
      required: true,
      message: 'Please select at least one activity type',
      trigger: 'change',
    },
  ],
  resource: [
    {
      required: true,
      message: 'Please select activity resource',
      trigger: 'change',
    },
  ],
  desc: [{ required: true, message: 'Please input activity form', trigger: 'blur' }],
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  // @ts-ignore
  await formEl?.validate((valid, fields) => {
    if (valid) {
      console.log('submit!');
    } else {
      console.log('error submit!', fields);
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  // @ts-ignore
  formEl?.resetFields();
};
</script>

<style scoped>
.text-center {
  text-align: center;
}
</style>
