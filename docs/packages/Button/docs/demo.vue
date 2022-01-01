<template>
  <div>
    <fz-button @click="handleClick">default</fz-button>
    <fz-button type="primary" @click="handleClick">primary</fz-button>
    <fz-button type="success" @click="handleClick">success</fz-button>
    <fz-button type="warning" @click="handleClick">warning</fz-button>
    <fz-button type="info" @click="handleClick">info</fz-button>
    <fz-button type="error" @click="handleClick">error</fz-button>
    <fz-button type="text" @click="handleClick">text</fz-button>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const handleClick = () => {
      console.log('button click');
    };
    return {
      handleClick,
    };
  },
});
</script>
