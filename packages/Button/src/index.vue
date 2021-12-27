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
    <!-- <el-icon v-if="loading" class="is-loading">
      <loading />
    </el-icon>
    <el-icon v-else-if="icon">
      <component :is="icon" />
    </el-icon> -->
    <span
      v-if="$slots.default"
      :class="{ 'fz-button__text--expand': shouldAddSpace }"
    >
      <slot></slot>
    </span>
  </button>
</template>

<script lang="ts">
import { ComponentSize, useSize } from 'packages/_hooks/use-size';
import { computed, defineComponent, ExtractPropTypes, PropType } from 'vue';

export type ButtonType =
  | 'default'
  | 'primary'
  | 'success'
  | 'warning'
  | 'info'
  | 'error'
  | 'text';
export type ButtonNativeType = 'button' | 'submit' | 'reset';
export type ButtonSize = ComponentSize;

export const buttonEmits = {
  click: (evt: MouseEvent) => evt instanceof MouseEvent,
};

export const buttonProps = {
  size: {
    type: String as PropType<ButtonSize>,
    default: 'medium',
  },
  type: {
    type: String as PropType<ButtonType>,
    default: 'default',
  },
  nativeType: {
    type: String as PropType<ButtonNativeType>,
    default: 'button',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  color: {
    type: String,
    default: '',
  },
  loading: {
    type: Boolean,
    default: false,
  },
  plain: {
    type: Boolean,
    default: false,
  },
  round: {
    type: Boolean,
    default: false,
  },
  circle: {
    type: Boolean,
    default: false,
  },
  autofocus: {
    type: Boolean,
    default: false,
  },
  autoInsertSpace: {
    type: Boolean,
    default: undefined,
  },
};

export type ButtonProps = ExtractPropTypes<typeof buttonProps>;
export type ButtonEmits = typeof buttonEmits;

export default defineComponent({
  name: 'FzButton',
  props: buttonProps,
  emits: buttonEmits,
  setup(props: ButtonProps, { slots, emit }) {
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
    const buttonType = computed(() => props.type);
    // size maybe from globalConfig or form;
    const buttonSize = useSize();
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
          //   '--el-button-bg-color': plainBgColor
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

<style lang="less">
@import './index.less';
</style>
