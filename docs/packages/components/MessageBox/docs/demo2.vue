<template>
  <fz-button text @click="open">Click to open the Message Box</fz-button>
</template>

<script lang="ts" setup>
import { FzMessage, FzMessageBox } from 'fz-ui';

const open = () => {
  FzMessageBox.confirm('proxy will permanently delete the file. Continue?', 'Warning', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    type: 'warning',
  })
    .then(() => {
      FzMessage({
        type: 'success',
        message: 'Delete completed',
      });
    })
    .catch(() => {
      FzMessage({
        type: 'info',
        message: 'Delete canceled',
      });
    });
};
</script>
