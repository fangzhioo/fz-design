<template>
  <label
    :class="[
      'fz-radio-button',
      size ? `fz-radio-button--${size}` : '',
      {
        'is-active': modelValue === label,
        'is-disabled': disabled,
        'is-focus': focus,
      },
    ]"
    role="radio"
    :aria-checked="modelValue === label"
    :aria-disabled="disabled"
    :tabindex="tabIndex"
    @keydown.space.stop.prevent="modelValue = disabled ? modelValue : label"
  >
    <input
      ref="radioRef"
      v-model="modelValue"
      class="fz-radio-button__original-radio"
      :value="label"
      type="radio"
      :name="name"
      :disabled="disabled"
      tabindex="-1"
      @focus="focus = true"
      @blur="focus = false"
    />
    <span class="fz-radio-button__inner" :style="modelValue === label ? activeStyle : {}" @keydown.stop>
      <slot>
        {{ label }}
      </slot>
    </span>
  </label>
</template>

<script lang="ts">
import { FZ_RADIO_GROUP_INJECT_KEY, UPDATE_MODEL_EVENT } from '@fzui/constants';
import { useDisabled, useSize } from '@fzui/hooks';
import { computed, CSSProperties, defineComponent, inject, ref } from 'vue';
import { radioButtonEmits, radioButtonProps, RadioProps } from './Radio';

export default defineComponent({
  name: 'FzRadioButton',
  props: radioButtonProps,
  emits: radioButtonEmits,
  setup(props, { emit }) {
    const radioRef = ref<HTMLInputElement>();
    const radioGroup = inject<any>(FZ_RADIO_GROUP_INJECT_KEY, undefined);
    const isGroup = computed(() => Boolean(radioGroup));
    const modelValue = computed<RadioProps['modelValue']>({
      get() {
        return isGroup.value ? radioGroup!.modelValue : props.modelValue!;
      },
      set(val) {
        if (isGroup.value) {
          radioGroup!.changeEvent(val);
        } else {
          emit(UPDATE_MODEL_EVENT, val);
        }
        radioRef.value!.checked = props.modelValue === props.label;
      },
    });

    const size = useSize(computed(() => radioGroup?.size));
    const disabled = useDisabled(computed(() => radioGroup?.disabled));
    const focus = ref(false);
    const tabIndex = computed(() => {
      return disabled.value || (isGroup.value && modelValue.value !== props.label) ? -1 : 0;
    });

    const activeStyle = computed<CSSProperties>(() => {
      return {
        backgroundColor: radioGroup?.fill || '',
        borderColor: radioGroup?.fill || '',
        boxShadow: radioGroup?.fill ? `-1px 0 0 0 ${radioGroup.fill}` : '',
        color: radioGroup?.textColor || '',
      };
    });

    return {
      isGroup,
      size,
      disabled,
      tabIndex,
      modelValue,
      focus,
      activeStyle,
      radioRef,
    };
  },
});
</script>

<style scoped></style>
