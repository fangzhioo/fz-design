<template>
  <span :class="['fz-check-tag', { 'is-checked': checked }]" @click="onChange">
    <slot></slot>
  </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { checkTagEmits, checkTagProps } from './CheckTag';

export default defineComponent({
  name: 'FzCheckTag',
  props: checkTagProps,
  emits: checkTagEmits,
  setup(props, { emit }) {
    const onChange = () => {
      const checked = !props.checked;
      emit('change', checked);
      emit('update:checked', checked);
    };

    return {
      onChange,
    };
  },
});
</script>
