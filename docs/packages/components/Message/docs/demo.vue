<template>
  <div>
    <fz-button @click="handleClick('success')">success</fz-button>
    <fz-button @click="handleClick('info')">info</fz-button>
    <fz-button @click="handleClick('warning')">warning</fz-button>
    <fz-button @click="handleClick('error')">error</fz-button>
  </div>
</template>

<script setup>
import { getCurrentInstance } from 'vue';

const app = getCurrentInstance();

const handleClick = (type) => {
  app.appContext.config.globalProperties.$message({
    message: `this is a ${type} message`,
    type,
  });
};
</script>
