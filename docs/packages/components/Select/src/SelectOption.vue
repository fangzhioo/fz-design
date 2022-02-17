<template>
  <li
    v-show="visible"
    :class="[
      'fz-select-dropdown__item',
      {
        'is-disabled': isDisabled,
        selected: itemSelected,
        hover: hover,
      },
    ]"
    @mouseenter="hoverItem"
    @click.stop="selectOptionClick"
  >
    <slot>
      <span>{{ currentLabel }}</span>
    </slot>
  </li>
</template>

<script lang="ts">
import { toRefs, defineComponent, getCurrentInstance, onBeforeUnmount } from 'vue';
import { selectOptionProps, SelectOptionProxy } from './Select';
import { useOption, useOptionStates } from './hooks/useOption';

export default defineComponent({
  name: 'FzOption',
  props: selectOptionProps,
  setup(props) {
    const instance = getCurrentInstance()!;

    const states = useOptionStates(props);

    const { currentLabel, itemSelected, isDisabled, select, hoverItem } = useOption(props, states);

    const { visible, hover } = toRefs(states);

    const vm = instance.proxy;
    const key = (vm as unknown as SelectOptionProxy).value;
    select.onOptionCreate(vm as unknown as SelectOptionProxy);

    onBeforeUnmount(() => {
      const { selected } = select;
      const selectedOptions = select.props.multiple ? selected : [selected];
      const doesExist = select.cachedOptions.has(key);
      const doesSelected = selectedOptions.some((item: any) => {
        return item.value === (vm as unknown as SelectOptionProxy).value;
      });
      // if option is not selected, remove it from cache
      if (doesExist && !doesSelected) {
        select.cachedOptions.delete(key);
      }
      select.onOptionDestroy(key);
    });

    function selectOptionClick() {
      if (props.disabled !== true && states.groupDisabled !== true) {
        select.handleOptionSelect(vm, true);
      }
    }

    return {
      currentLabel,
      itemSelected,
      isDisabled,
      select,
      hoverItem,
      visible,
      hover,
      selectOptionClick,
      states,
    };
  },
});
</script>
