<template>
  <div class="fz-button-group">
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { defineComponent, provide, reactive, toRef } from 'vue';
import { FZ_BUTTON_GROUP_INJECT_KEY } from 'packages/_utils/constants';
import { buttonGroupProps } from './ButtonGroup';

export default defineComponent({
  name: 'FzButtonGroup',
  props: buttonGroupProps,
  setup(props) {
    provide(
      FZ_BUTTON_GROUP_INJECT_KEY,
      reactive({
        size: toRef(props, 'size'),
        type: toRef(props, 'type'),
      }),
    );
  },
});
</script>
