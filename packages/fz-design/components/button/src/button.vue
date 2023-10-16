<script lang="ts">
  import { computed, defineComponent, inject, ref } from 'vue'
  import { IconLoading } from '@fz-design/fz-design-icon'
  import SvgIcon from '../../svg-icon/src/svg-icon.vue';
  import { useSize } from '../../../hooks'
  import { FZ_BUTTON_GROUP_INJECT_KEY } from '../../../constants'
  import { Props } from './props'
  import type { ButtonProps } from './interface'
  import type { ButtonGroupInstance } from '../../button-group'
  
  export default defineComponent({
    name: 'FzButton',
    components: { SvgIcon },
    props: Props,
    emits: {
      click: (evt: MouseEvent) => evt instanceof MouseEvent
    },
    setup (props: ButtonProps, { emit }) {
      const buttonRef = ref()
      const buttonGroupContext = inject<ButtonGroupInstance | undefined>(
        FZ_BUTTON_GROUP_INJECT_KEY,
        undefined
      )

      const buttonType = computed(() => props.type || buttonGroupContext?.type || '')
      // size maybe from globalConfig or form;
      const buttonSize = useSize(computed(() => buttonGroupContext?.size))
      const buttonDisabled = computed(() => props.disabled)
      const buttonStyle = computed(() => {
        let styles = {}
        const buttonColor = props.color
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
              '--fz-button-text-color': buttonColor
            }
          }
        }

        if (buttonDisabled.value) {
          //  const disabledButtonColor = new TinyColor(buttonColor).tint(50).toString();
          // styles['--fz-button-disabled-bg-color'] = disabledButtonColor
          // styles['--fz-button-disabled-border-color'] = disabledButtonColor
        }

        return styles
      })

      const handleClick = (evt: MouseEvent): void => {
        if (props.nativeType === 'reset') {
          // TODO form event
          // form?.resetFields()
        }
        emit('click', evt)
      }

      return {
        IconLoading,
        buttonRef,
        buttonType,
        buttonSize,
        buttonDisabled,
        buttonStyle,

        handleClick
      }
    }
  })
</script>

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
        'is-text': text
      }
    ]"
    :disabled="buttonDisabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
    :style="buttonStyle"
    @click="handleClick"
  >
    <svg-icon v-if="loading" name="loading" class="fz-button__icon" :icon="IconLoading" />
    <svg-icon v-else-if="icon" class="fz-button__icon" :icon="icon" />
    <slot v-else-if="$slots.icon" class="fz-button__icon" name="icon" />
    <span v-if="$slots.default" class="fz-button__inner">
      <slot></slot>
    </span>
  </button>
</template>
