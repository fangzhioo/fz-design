<template>
  <i :class="`fz-icon-${iconName}`" v-bind="$attrs"></i>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { iconEmits, iconProps } from './Icon';

export default defineComponent({
  name: 'FzIcon',
  inheritAttrs: false,
  props: iconProps,
  emits: iconEmits,
  setup(props) {
    const iconName = computed(() => props.name || '');

    return {
      iconName,
    };
  },
});
</script>
