<template>
  <div class="fz-collapse" role="tablist" aria-multiselectable="true">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { CHANGE_EVENT, FZ_COLLAPSE_INJECT_KEY, UPDATE_MODEL_EVENT } from '@fzui/constants';
import { defineComponent, provide, ref, watch } from 'vue';
import { collapseEmits, CollapseModelValue, collapseProps, CollapseProvider } from './Collapse';

export default defineComponent({
  name: 'FzCollapse',
  props: collapseProps,
  emits: collapseEmits,
  setup(props, { emit }) {
    const activeNames = ref(([] as CollapseModelValue[]).concat(props.modelValue));

    const setActiveNames = (_activeNames: CollapseModelValue | CollapseModelValue[]) => {
      activeNames.value = ([] as CollapseModelValue[]).concat(_activeNames);
      const value = props.accordion ? activeNames.value[0] : activeNames.value;
      emit(UPDATE_MODEL_EVENT, value);
      emit(CHANGE_EVENT, value);
    };

    const handleItemClick = (name: CollapseModelValue) => {
      if (props.accordion) {
        setActiveNames((activeNames.value[0] || activeNames.value[0] === 0) && activeNames.value[0] === name ? '' : name);
      } else {
        const _activeNames = activeNames.value.slice(0);
        const index = _activeNames.indexOf(name);

        if (index > -1) {
          _activeNames.splice(index, 1);
        } else {
          _activeNames.push(name);
        }
        setActiveNames(_activeNames);
      }
    };

    watch(
      () => props.modelValue,
      () => {
        activeNames.value = ([] as CollapseModelValue[]).concat(props.modelValue);
      },
      {
        deep: true,
      },
    );

    provide<CollapseProvider>(FZ_COLLAPSE_INJECT_KEY, {
      activeNames,
      handleItemClick,
    });

    return {
      activeNames,
      setActiveNames,
      handleItemClick,
    };
  },
});
</script>
