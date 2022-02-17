<template>
  <div :class="['fz-select-dropdown', { 'is-multiple': isMultiple }, popperClass]" :style="{ [isFitInputWidth ? 'width' : 'minWidth']: minWidth }">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, inject, ref } from 'vue';
import { FZ_SELECT_INJECT_KEY } from '@fzui/constants';
import { SelectContext } from './Select';
import { useResizeObserver } from '@vueuse/core';

export default defineComponent({
  name: 'FzSelectDropdown',
  setup() {
    const select = inject<SelectContext>(FZ_SELECT_INJECT_KEY)!;

    // computed
    const popperClass = computed(() => select.props.popperClass);
    const isMultiple = computed(() => select.props.multiple);
    const isFitInputWidth = computed(() => select.props.fitInputWidth);
    const minWidth = ref('');

    function updateMinWidth() {
      minWidth.value = `${select.selectWrapper?.getBoundingClientRect().width}px`;
    }

    onMounted(() => {
      // TODO: updatePopper
      // popper.value.update()
      updateMinWidth();
      useResizeObserver(select.selectWrapper, updateMinWidth);
    });

    return {
      popperClass,
      minWidth,
      isMultiple,
      isFitInputWidth,
    };
  },
});
</script>
