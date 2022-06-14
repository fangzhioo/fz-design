<template>
  <div>
    <fz-button @click="handleClick('success')">success</fz-button>
    <fz-button @click="handleClick('info')">info</fz-button>
    <fz-button @click="handleClick('warning')">warning</fz-button>
    <fz-button @click="handleClick('error')">error</fz-button>
  </div>
</template>

<script setup lang="ts">
import { FzMessage, MessageType } from 'fz-ui';

const handleClick = (type: MessageType) => {
  FzMessage({
    message: `this is a ${type} message`,
    type,
    showClose: true,
    grouping: true,
  });
};
</script>
