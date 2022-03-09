<template>
  <label
    :class="[
      'fz-radio',
      size ? 'fz-radio--' + size : '',
      {
        'is-disabled': disabled,
        'is-focus': focus,
        'is-bordered': border,
        'is-checked': modelValue === label,
      },
    ]"
    role="radio"
    :aria-checked="modelValue === label"
    :aria-disabled="disabled"
    :tabindex="tabIndex"
    @keydown.space.stop.prevent="modelValue = disabled ? modelValue : label"
  >
    <span :class="['fz-radio__input', { 'is-disabled': disabled, 'is-checked': modelValue === label }]">
      <span class="fz-radio__inner"></span>
      <input
        ref="radioRef"
        v-model="modelValue"
        class="fz-radio__original"
        :value="label"
        type="radio"
        aria-hidden="true"
        :name="name"
        :disabled="disabled"
        tabindex="-1"
        @focus="focus = true"
        @blur="focus = false"
        @change="handleChange"
      />
    </span>
    <span class="fz-radio__label" @keydown.stop>
      <slot>
        {{ label }}
      </slot>
    </span>
  </label>
</template>

<script lang="ts">
import { CHANGE_EVENT, FZ_RADIO_GROUP_INJECT_KEY, UPDATE_MODEL_EVENT } from '@fzui/constants';
import { useDisabled, useSize } from '@fzui/hooks';
import { computed, defineComponent, inject, nextTick, ref } from 'vue';
import { radioEmits, radioProps, RadioProps } from './Radio';

export default defineComponent({
  name: 'FzRadio',
  props: radioProps,
  emits: radioEmits,
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

    const handleChange = () => {
      nextTick(() => emit(CHANGE_EVENT, modelValue.value));
    };

    return {
      focus,
      isGroup,
      modelValue,
      tabIndex,
      size,
      disabled,
      radioRef,

      handleChange,
    };
  },
});
</script>
