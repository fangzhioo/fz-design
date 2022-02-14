<template>
  <div
    v-show="type !== 'hidden'"
    :class="[
      type === 'textarea' ? 'fz-textarea' : 'fz-input',
      inputSize ? 'fz-input--' + inputSize : '',
      {
        'is-disabled': inputDisabled,
        'is-exceed': inputExceed,
        'fz-input-group': $slots.prepend || $slots.append,
        'fz-input-group--append': $slots.append,
        'fz-input-group--prepend': $slots.prepend,
        'fz-input--prefix': $slots.prefix || prefixIcon,
        'fz-input--suffix': $slots.suffix || suffixIcon || clearable || showPassword,
        'fz-input--suffix--password-clear': clearable && showPassword,
      },
      $attrs.class,
    ]"
    :style="containerStyle"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <!-- input -->
    <template v-if="type !== 'textarea'">
      <!-- prepend slot -->
      <div v-if="$slots.prepend" class="fz-input-group__prepend">
        <slot name="prepend" />
      </div>

      <input
        ref="input"
        class="fz-input__inner"
        v-bind="attrs"
        :type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
        :disabled="inputDisabled"
        :readonly="readonly"
        :autocomplete="autocomplete"
        :tabindex="tabindex"
        :aria-label="label"
        :placeholder="placeholder"
        :style="inputStyle"
        @compositionstart="handleCompositionStart"
        @compositionupdate="handleCompositionUpdate"
        @compositionend="handleCompositionEnd"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @change="handleChange"
        @keydown="handleKeydown"
      />

      <!-- prefix slot -->
      <span v-if="$slots.prefix || prefixIcon" class="fz-input__prefix">
        <span class="fz-input__prefix-inner">
          <slot name="prefix"></slot>
          <fz-icon v-if="prefixIcon" :name="prefixIcon" class="fz-input__icon" />
        </span>
      </span>

      <!-- suffix slot -->
      <span v-if="suffixVisible" class="fz-input__suffix">
        <span class="fz-input__suffix-inner">
          <template v-if="!showClear || !showPwdVisible || !isWordLimitVisible">
            <slot name="suffix"></slot>
            <fz-icon v-if="suffixIcon" :name="suffixIcon" class="fz-input__icon" />
          </template>
          <fz-icon v-if="showClear" class="fz-input__icon fz-input__clear" name="delete-filling" @mousedown.prevent @click="clear" />
          <fz-icon v-if="showPwdVisible" class="fz-input__icon fz-input__clear" name="browse" @click="handlePasswordVisible" />
          <span v-if="isWordLimitVisible" class="fz-input__count">
            <span class="fz-input__count-inner"> {{ textLength }} / {{ attrs.maxlength }} </span>
          </span>
        </span>
        <fz-icon v-if="validateState && validateIcon" :name="validateIcon" class="fz-input__icon fz-input__validateIcon" />
      </span>

      <!-- append slot -->
      <div v-if="$slots.append" class="fz-input-group__append">
        <slot name="append" />
      </div>
    </template>

    <!-- textarea -->
    <template v-else>
      <textarea
        ref="textarea"
        class="fz-textarea__inner"
        v-bind="attrs"
        :tabindex="tabindex"
        :disabled="inputDisabled"
        :readonly="readonly"
        :autocomplete="autocomplete"
        :style="computedTextareaStyle"
        :aria-label="label"
        :placeholder="placeholder"
        @compositionstart="handleCompositionStart"
        @compositionupdate="handleCompositionUpdate"
        @compositionend="handleCompositionEnd"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @change="handleChange"
        @keydown="handleKeydown"
      />
      <span v-if="isWordLimitVisible" class="fz-input__count"> {{ textLength }} / {{ attrs.maxlength }} </span>
    </template>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, getCurrentInstance, nextTick, onMounted, onUpdated, ref, shallowRef, StyleValue, watch } from 'vue';
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '@fzui/constants';
import { isObject, isKorean } from '@fzui/utils';
import { useAttrs, useSize, useForm, useDisabled } from '@fzui/hooks';
import { isClient } from '@vueuse/core';
import { calcTextareaHeight } from './calc-textarea-height';
import { inputEmits, inputProps, PENDANT_MAP, TargetElement, ValidateIconsMap } from './Input';
import { Icon } from '@fzui/components/Icon';

export default defineComponent({
  name: 'FzInput',
  components: {
    FzIcon: Icon,
  },
  props: inputProps,
  emits: inputEmits,
  inheritAttrs: false,
  setup(props, { slots, emit, attrs: rawAttrs }) {
    const instance = getCurrentInstance();
    const { form, formItem } = useForm();
    const attrs = useAttrs();
    const inputSize = useSize();
    const inputDisabled = useDisabled();

    const input = ref<HTMLInputElement>();
    const textarea = ref<HTMLTextAreaElement>();
    const focused = ref(false);
    const hovering = ref(false);
    const isComposing = ref(false);
    const passwordVisible = ref(false);
    const textareaCalcStyle = shallowRef(props.inputStyle);

    const inputOrTextarea = computed(() => input.value || textarea.value);
    const needStatusIcon = computed(() => form?.statusIcon ?? false);
    const validateState = computed<string>(() => formItem?.validateState || '');
    const validateIcon = computed<string | undefined>(() => ValidateIconsMap[validateState.value]);
    const containerStyle = computed(() => rawAttrs.style as StyleValue);
    const computedTextareaStyle = computed<StyleValue>(() => [props.inputStyle, textareaCalcStyle.value, { resize: props.resize }]);
    const nativeInputValue = computed(() => (props.modelValue === null || props.modelValue === undefined ? '' : String(props.modelValue)));
    const showClear = computed(
      () => props.clearable && !inputDisabled.value && !props.readonly && Boolean(nativeInputValue.value) && (focused.value || hovering.value),
    );
    const showPwdVisible = computed(() => props.showPassword && !inputDisabled.value && !props.readonly && (Boolean(nativeInputValue.value) || focused.value));
    const isWordLimitVisible = computed(
      () =>
        props.showWordLimit &&
        Boolean(attrs.value.maxlength) &&
        (props.type === 'text' || props.type === 'textarea') &&
        !inputDisabled.value &&
        !props.readonly &&
        !props.showPassword,
    );
    const textLength = computed(() => Array.from(nativeInputValue.value).length);
    const inputExceed = computed(
      () =>
        // show exceed style if length of initial value greater then maxlength
        Boolean(isWordLimitVisible.value) && textLength.value > Number(attrs.value.maxlength),
    );
    const suffixVisible = computed(
      () =>
        Boolean(slots.suffix) ||
        Boolean(props.suffixIcon) ||
        showClear.value ||
        props.showPassword ||
        isWordLimitVisible.value ||
        (Boolean(validateState.value) && needStatusIcon.value),
    );

    const resizeTextarea = () => {
      const { type, autosize } = props;

      if (!isClient || type !== 'textarea') {
        return;
      }
      if (!textarea.value) {
        return;
      }
      if (autosize) {
        const minRows = isObject(autosize) ? autosize.minRows : undefined;
        const maxRows = isObject(autosize) ? autosize.maxRows : undefined;
        textareaCalcStyle.value = {
          ...calcTextareaHeight(textarea.value, minRows, maxRows),
        };
      } else {
        textareaCalcStyle.value = {
          minHeight: calcTextareaHeight(textarea.value).minHeight,
        };
      }
    };

    const setNativeInputValue = () => {
      const input = inputOrTextarea.value;
      if (!input || input.value === nativeInputValue.value) {
        return;
      }
      input.value = nativeInputValue.value;
    };

    const calcIconOffset = (place: 'prefix' | 'suffix') => {
      if (!instance) {
        return;
      }
      const { el } = instance.vnode;
      if (!el) {
        return;
      }
      const elList: HTMLSpanElement[] = Array.from(el.querySelectorAll(`.el-input__${place}`));
      const target = elList.find((item) => item.parentNode === el);

      if (!target) {
        return;
      }

      const pendant = PENDANT_MAP[place];

      if (slots[pendant]) {
        target.style.transform = `translateX(${place === 'suffix' ? '-' : ''}${el.querySelector(`.el-input-group__${pendant}`).offsetWidth}px)`;
      } else {
        target.removeAttribute('style');
      }
    };

    const updateIconOffset = () => {
      calcIconOffset('prefix');
      calcIconOffset('suffix');
    };

    const handleInput = (event: Event) => {
      const { value } = event.target as TargetElement;

      // should not emit input during composition
      if (isComposing.value) {
        return;
      }

      // should remove the following line when we don't support IE
      if (value === nativeInputValue.value) {
        return;
      }

      emit(UPDATE_MODEL_EVENT, value);
      emit('input', value);

      // ensure native input value is controlled
      nextTick(setNativeInputValue);
    };

    const handleChange = (event: Event) => {
      const target = event.target as TargetElement;
      emit(CHANGE_EVENT, target.value);
    };

    const focus = () => {
      nextTick(() => {
        inputOrTextarea.value?.focus();
      });
    };

    const blur = () => {
      inputOrTextarea.value?.blur();
    };

    const handleFocus = (event: FocusEvent) => {
      focused.value = true;
      emit('focus', event);
    };

    const handleBlur = (event: FocusEvent) => {
      focused.value = false;
      emit('blur', event);
      if (props.validateEvent) {
        formItem?.validate?.('blur');
      }
    };

    const select = () => {
      inputOrTextarea.value?.select();
    };

    const handleCompositionStart = (event: CompositionEvent) => {
      emit('compositionstart', event);
      isComposing.value = true;
    };

    const handleCompositionUpdate = (event: CompositionEvent) => {
      const target = event.target as HTMLInputElement;
      emit('compositionupdate', event);
      const text = target?.value;
      const lastCharacter = text[text.length - 1] || '';
      isComposing.value = !isKorean(lastCharacter);
    };

    const handleCompositionEnd = (event: CompositionEvent) => {
      emit('compositionend', event);
      if (isComposing.value) {
        isComposing.value = false;
        handleInput(event);
      }
    };

    const clear = () => {
      emit(UPDATE_MODEL_EVENT, '');
      emit(CHANGE_EVENT, '');
      emit('clear');
      emit('input', '');
    };

    const handlePasswordVisible = () => {
      passwordVisible.value = !passwordVisible.value;
      focus();
    };

    const onMouseLeave = (evt: MouseEvent) => {
      hovering.value = false;
      emit('mouseleave', evt);
    };

    const onMouseEnter = (evt: MouseEvent) => {
      hovering.value = true;
      emit('mouseenter', evt);
    };

    const handleKeydown = (evt: KeyboardEvent) => {
      emit('keydown', evt);
    };

    watch(
      () => props.modelValue,
      () => {
        nextTick(resizeTextarea);
        if (props.validateEvent) {
          formItem?.validate?.(CHANGE_EVENT);
        }
      },
    );

    // native input value is set explicitly
    // do not use v-model / :value in template
    watch(nativeInputValue, () => setNativeInputValue());

    // when change between <input> and <textarea>,
    // update DOM dependent value and styles
    watch(
      () => props.type,
      () => {
        nextTick(() => {
          setNativeInputValue();
          resizeTextarea();
          updateIconOffset();
        });
      },
    );

    onMounted(() => {
      setNativeInputValue();
      updateIconOffset();
      nextTick(resizeTextarea);
    });

    onUpdated(() => {
      nextTick(updateIconOffset);
    });

    return {
      input,
      textarea,
      attrs,
      inputSize,
      validateState,
      validateIcon,
      containerStyle,
      computedTextareaStyle,
      inputDisabled,
      showClear,
      showPwdVisible,
      isWordLimitVisible,
      textLength,
      hovering,
      inputExceed,
      passwordVisible,
      inputOrTextarea,
      suffixVisible,

      resizeTextarea,
      handleInput,
      handleChange,
      handleFocus,
      handleBlur,
      handleCompositionStart,
      handleCompositionUpdate,
      handleCompositionEnd,
      handlePasswordVisible,
      clear,
      select,
      focus,
      blur,
      onMouseLeave,
      onMouseEnter,
      handleKeydown,
    };
  },
});
</script>
