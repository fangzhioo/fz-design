<template>
  <div>
    <fz-button @click="handleClick('success')">success</fz-button>
    <fz-button @click="handleClick('info')">info</fz-button>
    <fz-button @click="handleClick('warning')">warning</fz-button>
    <fz-button @click="handleClick('error')">error</fz-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { message, MessageType } from '@fzui/components/Message';

export default defineComponent({
  name: 'demo2',
  setup() {
    const handleClick = (type: MessageType) => {
      message({
        message: `this is a ${type} message`,
        type,
        showClose: true,
        grouping: true,
      });
    };

    return {
      handleClick,
    };
  },
});
</script>

<style scoped></style>
