<template>
  <label
    class="fz-checkbox-button"
    :class="[size ? 'fz-checkbox-button--' + size : '', { 'is-disabled': isDisabled }, { 'is-checked': isChecked }, { 'is-focus': focus }]"
    role="checkbox"
    :aria-checked="isChecked"
    :aria-disabled="isDisabled"
  >
    <input
      v-if="trueLabel || falseLabel"
      v-model="model"
      class="fz-checkbox-button__original"
      type="checkbox"
      :name="name"
      :tabindex="tabindex"
      :disabled="isDisabled"
      :true-value="trueLabel"
      :false-value="falseLabel"
      @change="handleChange"
      @focus="focus = true"
      @blur="focus = false"
    />
    <input
      v-else
      v-model="model"
      class="fz-checkbox-button__original"
      type="checkbox"
      :name="name"
      :tabindex="tabindex"
      :disabled="isDisabled"
      :value="label"
      @change="handleChange"
      @focus="focus = true"
      @blur="focus = false"
    />

    <span v-if="$slots.default || label" class="fz-checkbox-button__inner" :style="isChecked ? activeStyle : ''">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script lang="ts">
import { computed, defineComponent, StyleValue } from 'vue';
import { checkboxButtonEmits, checkboxButtonProps } from './CheckboxButton';
import { useCheckbox, useCheckboxGroup } from './useCheckbox';

export default defineComponent({
  name: 'FzCheckboxButton',
  props: checkboxButtonProps,
  emits: checkboxButtonEmits,
  setup(props) {
    const { focus, isChecked, isDisabled, size, model, handleChange } = useCheckbox(props as any);
    const { checkboxGroup } = useCheckboxGroup() as any;

    const activeStyle = computed<StyleValue>(() => {
      const fillValue = checkboxGroup?.fill?.value ?? '';
      return {
        backgroundColor: fillValue,
        borderColor: fillValue,
        color: checkboxGroup?.textColor?.value ?? '',
        boxShadow: fillValue ? `-1px 0 0 0 ${fillValue}` : null,
      } as StyleValue;
    });
    return {
      focus,
      isChecked,
      isDisabled,
      model,
      handleChange,
      activeStyle,
      size,
    };
  },
});
</script>

<style scoped></style>
