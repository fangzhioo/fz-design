<template>
  <fz-button text @click="open">Click to open Message Box</fz-button>
</template>

<script lang="ts" setup>
import { FzMessage, FzMessageBox } from 'fz-ui';

const open = () => {
  FzMessageBox.prompt('Please input your e-mail', 'Tip', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
    inputErrorMessage: 'Invalid Email',
  })
    .then(({ value }) => {
      FzMessage({
        type: 'success',
        message: `Your email is:${value}`,
      });
    })
    .catch(() => {
      FzMessage({
        type: 'info',
        message: 'Input canceled',
      });
    });
};
</script>
