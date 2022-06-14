<template>
  <fz-button text @click="open">Click to open the Message Box</fz-button>
</template>

<script lang="ts" setup>
import { FzMessage, FzMessageBox } from 'fz-ui';

const open = () => {
  FzMessageBox.alert('This is a message', 'Title', {
    confirmButtonText: 'OK',
    callback: (action: string) => {
      FzMessage({
        type: 'info',
        message: `action: ${action}`,
      });
    },
  });
};
</script>
