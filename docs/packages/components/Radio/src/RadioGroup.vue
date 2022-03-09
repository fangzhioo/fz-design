<template>
  <div ref="radioGroupRef" class="fz-radio-group" role="radiogroup" @keydown="handleKeydown">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { CHANGE_EVENT, EVENT_CODE, FZ_RADIO_GROUP_INJECT_KEY, UPDATE_MODEL_EVENT } from '@fzui/constants';
import { useForm } from '@fzui/hooks';
import { debugWarn } from '@fzui/utils';
import { defineComponent, nextTick, onMounted, provide, reactive, ref, toRefs, watch } from 'vue';
import { radioGroupEmits, RadioGroupProps, radioGroupProps } from './Radio';

export default defineComponent({
  name: 'FzRadioGroup',
  props: radioGroupProps,
  emits: radioGroupEmits,
  setup(props, { emit }) {
    const radioGroupRef = ref<HTMLDivElement>();
    const { formItem } = useForm();

    const changeEvent = (value: RadioGroupProps['modelValue']) => {
      emit(UPDATE_MODEL_EVENT, value);
      nextTick(() => emit(CHANGE_EVENT, value));
    };

    const handleKeydown = (e: KeyboardEvent) => {
      if (!radioGroupRef.value) {
        return;
      }

      // 左右上下按键 可以在 radio 组内切换不同选项
      const target = e.target as HTMLInputElement;
      const className = target.nodeName === 'INPUT' ? '[type=radio]' : '[role=radio]';
      const radios = radioGroupRef.value.querySelectorAll<HTMLInputElement>(className);
      const length = radios.length;
      const index = Array.from(radios).indexOf(target);
      const roleRadios = radioGroupRef.value.querySelectorAll<HTMLInputElement>('[role=radio]');

      let nextIndex: number | null = null;
      switch (e.code) {
        case EVENT_CODE.left:
        case EVENT_CODE.up:
          e.stopPropagation();
          e.preventDefault();
          nextIndex = index === 0 ? length - 1 : index - 1;
          break;
        case EVENT_CODE.right:
        case EVENT_CODE.down:
          e.stopPropagation();
          e.preventDefault();
          nextIndex = index === length - 1 ? 0 : index + 1;
          break;
        default:
          break;
      }
      if (nextIndex === null) {
        return;
      }
      roleRadios[nextIndex].click();
      roleRadios[nextIndex].focus();
    };

    onMounted(() => {
      const radios = radioGroupRef.value!.querySelectorAll<HTMLInputElement>('[type=radio]');
      const firstLabel = radios[0];
      if (!Array.from(radios).some((radio) => radio.checked) && firstLabel) {
        firstLabel.tabIndex = 0;
      }
    });

    provide(
      FZ_RADIO_GROUP_INJECT_KEY,
      reactive({
        ...toRefs(props),
        changeEvent,
      }),
    );

    watch(
      () => props.modelValue,
      () => formItem?.validate('change').catch((err) => debugWarn(err)),
    );

    return {
      radioGroupRef,
      handleKeydown,
    };
  },
});
</script>

<style scoped></style>
