<template>
  <div class="fz-checkbox-group" role="group" aria-label="checkbox-group">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { FzFormItemContext, useSize } from '@fzui/hooks';
import { CHANGE_EVENT, UPDATE_MODEL_EVENT, FZ_CHECKBOX_GROUP_INJECT_KEY, FZ_FORMITEM_INJECT_KEY } from '@fzui/utils/constants';
import { computed, defineComponent, inject, nextTick, provide, toRefs, watch } from 'vue';
import { checkboxGroupEmits, checkboxGroupProps } from './CheckboxGroup';

export default defineComponent({
  name: 'FzCheckboxGroup',
  props: checkboxGroupProps,
  emits: checkboxGroupEmits,
  setup(props, context) {
    const elFormItem = inject(FZ_FORMITEM_INJECT_KEY, {} as FzFormItemContext);

    const checkboxGroupSize = useSize();

    const changeEvent = (value: unknown) => {
      context.emit(UPDATE_MODEL_EVENT, value);
      nextTick(() => {
        context.emit(CHANGE_EVENT, value);
      });
    };

    const modelValue = computed({
      get() {
        return props.modelValue;
      },
      set(val) {
        changeEvent(val);
      },
    });

    provide(FZ_CHECKBOX_GROUP_INJECT_KEY, {
      name: 'FzCheckboxGroup',
      ...toRefs(props),
      modelValue,
      checkboxGroupSize,
      changeEvent,
    });

    watch(
      () => props.modelValue,
      () => {
        elFormItem.validate?.(CHANGE_EVENT);
      },
    );
    return {};
  },
});
</script>

<style scoped></style>
