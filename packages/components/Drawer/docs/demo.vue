<template>
  <fz-radio-group v-model="direction">
    <fz-radio label="ltr">left to right</fz-radio>
    <fz-radio label="rtl">right to left</fz-radio>
    <fz-radio label="ttb">top to bottom</fz-radio>
    <fz-radio label="btt">bottom to top</fz-radio>
  </fz-radio-group>

  <fz-button type="primary" style="margin-left: 16px" @click="drawer = true"> open </fz-button>
  <fz-button type="primary" style="margin-left: 16px" @click="drawer2 = true"> with footer </fz-button>

  <fz-drawer v-model="drawer" title="I am the title" :direction="direction" :before-close="handleClose">
    <span>Hi, there!</span>
  </fz-drawer>
  <fz-drawer v-model="drawer2" :direction="direction">
    <template #title>
      <h4>set title by slot</h4>
    </template>
    <template #default>
      <div>
        <fz-radio v-model="radio1" label="Option 1" size="large">Option 1</fz-radio>
        <fz-radio v-model="radio1" label="Option 2" size="large">Option 2</fz-radio>
      </div>
    </template>
    <template #footer>
      <div style="flex: auto">
        <fz-button @click="cancelClick">cancel</fz-button>
        <fz-button type="primary" @click="confirmClick">confirm</fz-button>
      </div>
    </template>
  </fz-drawer>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const drawer = ref(false);
const drawer2 = ref(false);
const direction = ref('rtl');
const radio1 = ref('Option 1');
const handleClose = (done: () => void) => {
  console.log('before-close');
  done();
};
function cancelClick() {
  drawer2.value = false;
}
function confirmClick() {
  drawer2.value = false;
}
</script>
