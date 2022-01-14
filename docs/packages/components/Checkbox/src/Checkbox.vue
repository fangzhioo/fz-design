<template>
  <label
    :id="id"
    class="fz-checkbox"
    :class="[checkboxSize ? 'fz-checkbox--' + checkboxSize : '', { 'is-disabled': isDisabled }, { 'is-bordered': border }, { 'is-checked': isChecked }]"
    :aria-controls="indeterminate ? controls : undefined"
  >
    <span
      class="fz-checkbox__input"
      :class="{
        'is-disabled': isDisabled,
        'is-checked': isChecked,
        'is-indeterminate': indeterminate,
        'is-focus': focus,
      }"
      :tabindex="indeterminate ? 0 : undefined"
      :role="indeterminate ? 'checkbox' : undefined"
      :aria-checked="indeterminate ? 'mixed' : false"
    >
      <span class="fz-checkbox__inner"></span>
      <input
        v-if="trueLabel || falseLabel"
        v-model="model"
        class="fz-checkbox__original"
        type="checkbox"
        :aria-hidden="indeterminate ? 'true' : 'false'"
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
        class="fz-checkbox__original"
        type="checkbox"
        :aria-hidden="indeterminate ? 'true' : 'false'"
        :disabled="isDisabled"
        :value="label"
        :name="name"
        :tabindex="tabindex"
        @change="handleChange"
        @focus="focus = true"
        @blur="focus = false"
      />
    </span>
    <span v-if="$slots.default || label" class="fz-checkbox__label">
      <slot></slot>
      <template v-if="!$slots.default">{{ label }}</template>
    </span>
  </label>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { checkboxEmits, checkboxProps } from './Checkbox';
import { useCheckbox } from './useCheckbox';

export default defineComponent({
  name: 'FzCheckbox',
  props: checkboxProps,
  emits: checkboxEmits,
  setup(props) {
    return useCheckbox(props);
  },
});
</script>
