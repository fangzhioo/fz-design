<template>
  <fz-button type="primary" style="margin-left: 16px" @click="drawer = true"> open </fz-button>

  <fz-drawer v-model="drawer" title="I'm outer Drawer" size="50%">
    <div>
      <fz-button @click="innerDrawer = true">Click me!</fz-button>
      <fz-drawer v-model="innerDrawer" title="I'm inner Drawer" :append-to-body="true" :before-close="handleClose">
        <p>_(:зゝ∠)_</p>
      </fz-drawer>
    </div>
  </fz-drawer>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const drawer = ref(false);
const innerDrawer = ref(false);

const handleClose = (done: () => void) => {
  done();
};
</script>
