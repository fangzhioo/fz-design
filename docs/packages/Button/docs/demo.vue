<template>
  <div>
    <fz-button size="tiny" type="info" @click="handleClick">按钮1</fz-button>
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
