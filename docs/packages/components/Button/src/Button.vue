<template>
  <button
    ref="buttonRef"
    :class="[
      'fz-button',
      buttonType ? 'fz-button--' + buttonType : '',
      buttonSize ? 'fz-button--' + buttonSize : '',
      {
        'is-disabled': buttonDisabled,
        'is-loading': loading,
        'is-plain': plain,
        'is-round': round,
        'is-circle': circle,
      },
    ]"
    :disabled="buttonDisabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
    :style="buttonStyle"
    @click="handleClick"
  >
    <fz-icon class="fz-button__icon" v-if="loading" name="loading" />
    <fz-icon class="fz-button__icon" v-else-if="icon" :name="icon" />
    <span v-if="$slots.default" :class="{ 'fz-button__text--expand': shouldAddSpace }">
      <slot></slot>
    </span>
  </button>
</template>

<script lang="ts">
import { computed, defineComponent, inject, ref } from 'vue';
import { useSize } from '@fzui/hooks';
import { FZ_BUTTON_GROUP_INJECT_KEY } from '@fzui/constants';
import { buttonEmits, buttonProps, ButtonProps } from './Button';
import { ButtonGroupInstance } from './ButtonGroup';
import { Icon } from '@fzui/components/Icon';

export default defineComponent({
  name: 'FzButton',
  components: {
    FzIcon: Icon,
  },
  props: buttonProps,
  emits: buttonEmits,
  setup(props: ButtonProps, { slots, emit }) {
    const buttonRef = ref();
    const buttonGroupContext = inject<ButtonGroupInstance | undefined>(FZ_BUTTON_GROUP_INJECT_KEY, undefined);
    const autoInsertSpace = computed(() => props.autoInsertSpace);
    // add space between two characters in Chinese
    const shouldAddSpace = computed(() => {
      const defaultSlot = slots.default?.();
      if (autoInsertSpace.value && defaultSlot?.length === 1) {
        const slot = defaultSlot[0];
        if (slot?.type === Text) {
          const text = slot.children;
          return /^\p{Unified_Ideograph}{2}$/u.test(text as string);
        }
      }
      return false;
    });
    const buttonType = computed(() => props.type || buttonGroupContext?.type || '');
    // size maybe from globalConfig or form;
    const buttonSize = useSize(computed(() => buttonGroupContext?.size));
    const buttonDisabled = computed(() => props.disabled);
    const buttonStyle = computed(() => {
      let styles = {};
      const buttonColor = props.color;
      if (buttonColor) {
        // TODO color genarator by @npm: @ctrl/tinycolor
        // const shadeBgColor = new TinyColor(buttonColor).shade(10).toString()
        if (props.plain) {
          // const plainBgColor = new TinyColor(buttonColor).tint(90).toString();
          // styles = {
          //   '--fz-button-bg-color': plainBgColor
          // };
        } else {
          styles = {
            '--fz-button-text-color': buttonColor,
          };
        }
      }

      if (buttonDisabled.value) {
        //  const disabledButtonColor = new TinyColor(buttonColor).tint(50).toString();
        // styles['--fz-button-disabled-bg-color'] = disabledButtonColor
        // styles['--fz-button-disabled-border-color'] = disabledButtonColor
      }

      return styles;
    });

    const handleClick = (evt: MouseEvent) => {
      if (props.nativeType === 'reset') {
        // TODO form event
        // form?.resetFields()
      }
      emit('click', evt);
    };

    return {
      buttonRef,
      shouldAddSpace,
      buttonType,
      buttonSize,
      buttonDisabled,
      buttonStyle,

      handleClick,
    };
  },
});
</script>
