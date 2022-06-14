<template>
  <div class="{{ compPrefixClass }}{{ compClassName }}">
    我是{{ compZhName }}组件
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { {{ compClassName }}Props, {{ compClassName }}Emits } from './{{compName}}';

export default defineComponent({
  name: '{{ compPrefix }}{{ compName }}',
  props: {{ compClassName }}Props,
  emits: {{ compClassName }}Emits,
  setup(props, context) {
    return {};
  },
});
</script>
