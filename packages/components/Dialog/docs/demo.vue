<template>
  <fz-button type="text" @click="dialogVisible = true">click to open the Dialog</fz-button>

  <fz-dialog v-model="dialogVisible" title="Tips" width="30%" :before-close="handleClose">
    <span>This is a message</span>
    <template #footer>
      <span class="dialog-footer">
        <fz-button @click="dialogVisible = false">Cancel</fz-button>
        <fz-button type="primary" @click="dialogVisible = false">Confirm</fz-button>
      </span>
    </template>
  </fz-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const dialogVisible = ref(false);

const handleClose = (done: () => void) => {
  if (window.confirm('Are you sure to close this dialog?')) {
    done();
  }
};
</script>
<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
