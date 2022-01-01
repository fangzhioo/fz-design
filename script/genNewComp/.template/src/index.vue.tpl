<template>
  <div class="{{ compPrefixClass }}{{ compClassName }}">
    我是{{ compZhName }}组件
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: '{{ compPrefix }}{{ compName }}',
  setup(props, context) {
    return {};
  },
});
</script>
