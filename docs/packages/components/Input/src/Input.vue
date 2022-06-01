<template>
  <div
    v-show="type !== 'hidden'"
    v-bind="containerAttrs"
    :class="[
      type === 'textarea' ? 'fz-textarea' : 'fz-input',
      `fz-input--${inputSize}`,
      {
        'is-disabled': inputDisabled,
        'is-exceed': inputExceed,
        'fz-input-group': $slots.prepend || $slots.append,
        'fz-input-group--append': $slots.append,
        'fz-input-group--prepend': $slots.prepend,
        'fz-input--prefix': $slots.prefix || prefixIcon,
        'fz-input--suffix': $slots.suffix || suffixIcon || clearable || showPassword,
        'fz-input-suffix--password-clear': showClear && showPwdVisible,
      },
      $attrs.class,
    ]"
    :style="containerStyle"
    :role="containerRole"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <!-- input -->
    <template v-if="type !== 'textarea'">
      <!-- prepend slot -->
      <div v-if="$slots.prepend" class="fz-input-group__prepend">
        <slot name="prepend" />
      </div>

      <div :class="['fz-input__wrapper', { 'is-focus': focused }]">
        <!-- prefix slot -->
        <span v-if="$slots.prefix || prefixIcon" class="fz-input__prefix">
          <span class="fz-input__prefix-inner">
            <slot name="prefix" />
            <fz-icon v-if="prefixIcon" :name="prefixIcon" class="fz-input__icon" />
          </span>
        </span>

        <input
          :id="inputId"
          ref="input"
          class="fz-input__inner"
          v-bind="attrs"
          :type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
          :disabled="inputDisabled"
          :formatter="formatter"
          :parser="parser"
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

        <!-- suffix slot -->
        <span v-if="suffixVisible" class="fz-input__suffix">
          <span class="fz-input__suffix-inner">
            <template v-if="!showClear || !showPwdVisible || !isWordLimitVisible">
              <slot name="suffix" />
              <fz-icon v-if="suffixIcon" :name="suffixIcon" class="fz-input__icon" />
            </template>
            <fz-icon v-if="showClear" class="fz-input__icon fz-input__clear" name="delete-filling" @mousedown.prevent @click="clear" />

            <fz-icon v-if="showPwdVisible" class="fz-input__icon fz-input__password" @click="handlePasswordVisible" :name="passwordIcon" />
            <span v-if="isWordLimitVisible" class="fz-input__count">
              <span class="fz-input__count-inner"> {{ textLength }} / {{ attrs.maxlength }} </span>
            </span>
            <fz-icon
              v-if="validateState && validateIcon && needStatusIcon"
              :class="[
                'fz-input__icon',
                'fz-input__validateIcon',
                {
                  'is-loading': validateState === 'validating',
                },
              ]"
              :name="validateIcon"
            />
          </span>
        </span>
      </div>

      <!-- append slot -->
      <div v-if="$slots.append" class="fz-input-group__append">
        <slot name="append" />
      </div>
    </template>

    <!-- textarea -->
    <template v-else>
      <textarea
        :id="inputId"
        ref="textarea"
        class="fz-textarea__inner"
        v-bind="attrs"
        :tabindex="tabindex"
        :disabled="inputDisabled"
        :readonly="readonly"
        :autocomplete="autocomplete"
        :style="textareaStyle"
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
      <span v-if="isWordLimitVisible" :style="countStyle" class="fz-input__count"> {{ textLength }} / {{ attrs.maxlength }} </span>
    </template>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, getCurrentInstance, nextTick, onMounted, onUpdated, ref, shallowRef, StyleValue, watch, toRef } from 'vue';
import { useResizeObserver } from '@vueuse/core';
import { CHANGE_EVENT, UPDATE_MODEL_EVENT, INPUT_EVENT, FOCUS_EVENT, BLUR_EVENT } from '@fzui/constants';
import { isObject, isKorean, isClient, isNil, debugWarn } from '@fzui/utils';
import { useAttrs, useSize, useForm, useFormItemInputId, useDisabled, useCursor } from '@fzui/hooks';
import { calcTextareaHeight } from './util';
import { inputEmits, inputProps, PENDANT_MAP, ValidateIconsMap, TargetElement } from './Input';
import { Icon } from '@fzui/components/Icon';

export default defineComponent({
  name: 'FzInput',
  inheritAttrs: false,
  components: {
    FzIcon: Icon,
  },
  props: inputProps,
  emits: inputEmits,
  setup(props, { slots, emit, attrs: rawAttrs, expose }) {
    const instance = getCurrentInstance();
    const { form, formItem } = useForm();

    const containerAttrs = computed<Record<string, unknown>>(() => {
      const comboBoxAttrs: any = {};
      if (props.containerRole === 'combobox') {
        comboBoxAttrs['aria-haspopup'] = rawAttrs['aria-haspopup'];
        comboBoxAttrs['aria-owns'] = rawAttrs['aria-owns'];
        comboBoxAttrs['aria-expanded'] = rawAttrs['aria-expanded'];
      }
      return comboBoxAttrs;
    });

    const attrs = useAttrs({
      excludeKeys: computed<string[]>(() => {
        return Object.keys(containerAttrs.value);
      }),
    });
    const { inputId } = useFormItemInputId(props, {
      formItemContext: formItem,
    });
    const inputSize = useSize();
    const inputDisabled = useDisabled();
    // const nsInput = useNamespace('input')
    // const nsTextarea = useNamespace('textarea')

    const input = shallowRef<HTMLInputElement>();
    const textarea = shallowRef<HTMLTextAreaElement>();

    const focused = ref(false);
    const hovering = ref(false);
    const isComposing = ref(false);
    const passwordVisible = ref(false);
    const countStyle = ref<StyleValue>();
    const textareaCalcStyle = shallowRef(props.inputStyle);

    const _ref = computed(() => input.value || textarea.value);

    const needStatusIcon = computed(() => form?.statusIcon ?? false);
    const validateState = computed(() => formItem?.validateState || '');
    const validateIcon = computed(() => ValidateIconsMap[validateState.value]);
    const passwordIcon = computed(() => (passwordVisible.value ? 'browse' : 'hide'));
    const containerStyle = computed<StyleValue>(() => [rawAttrs.style as StyleValue, props.inputStyle]);
    const textareaStyle = computed<StyleValue>(() => [props.inputStyle, textareaCalcStyle.value, { resize: props.resize }]);
    const nativeInputValue = computed(() => (isNil(props.modelValue) ? '' : String(props.modelValue)));
    const showClear = computed(
      () => props.clearable && !inputDisabled.value && !props.readonly && !!nativeInputValue.value && (focused.value || hovering.value),
    );
    const showPwdVisible = computed(() => props.showPassword && !inputDisabled.value && !props.readonly && (!!nativeInputValue.value || focused.value));
    const isWordLimitVisible = computed(
      () =>
        props.showWordLimit &&
        !!attrs.value.maxlength &&
        (props.type === 'text' || props.type === 'textarea') &&
        !inputDisabled.value &&
        !props.readonly &&
        !props.showPassword,
    );
    const textLength = computed(() => Array.from(nativeInputValue.value).length);
    const inputExceed = computed(
      () =>
        // show exceed style if length of initial value greater then maxlength
        !!isWordLimitVisible.value && textLength.value > Number(attrs.value.maxlength),
    );
    const suffixVisible = computed(
      () =>
        !!slots.suffix ||
        !!props.suffixIcon ||
        showClear.value ||
        props.showPassword ||
        isWordLimitVisible.value ||
        (!!validateState.value && needStatusIcon.value),
    );

    const [recordCursor, setCursor] = useCursor(input);

    useResizeObserver(textarea, (entries) => {
      if (!isWordLimitVisible.value || props.resize !== 'both') return;
      const entry = entries[0];
      const { width } = entry.contentRect;
      countStyle.value = {
        /** right: 100% - width + padding(15) + right(6) */
        right: `calc(100% - ${width + 15 + 6}px)`,
      };
    });

    const resizeTextarea = () => {
      const { type, autosize } = props;

      if (!isClient || type !== 'textarea') return;

      if (autosize) {
        const minRows = isObject(autosize) ? autosize.minRows : undefined;
        const maxRows = isObject(autosize) ? autosize.maxRows : undefined;
        textareaCalcStyle.value = {
          ...calcTextareaHeight(textarea.value!, minRows, maxRows),
        };
      } else {
        textareaCalcStyle.value = {
          minHeight: calcTextareaHeight(textarea.value!).minHeight,
        };
      }
    };

    const setNativeInputValue = () => {
      const input = _ref.value;
      if (!input || input.value === nativeInputValue.value) return;
      input.value = nativeInputValue.value;
    };

    const calcIconOffset = (place: 'prefix' | 'suffix') => {
      const { el } = instance!.vnode;
      if (!el) return;
      const elList = Array.from((el as Element).querySelectorAll<HTMLSpanElement>(`.fz-input__${place}`));
      const target = elList.find((item) => item.parentNode === el);
      if (!target) return;

      const pendant = PENDANT_MAP[place];

      if (slots[pendant]) {
        target.style.transform = `translateX(${place === 'suffix' ? '-' : ''}${el.querySelector(`.fz-input-group__${pendant}}`).offsetWidth}px)`;
      } else {
        target.removeAttribute('style');
      }
    };

    const updateIconOffset = () => {
      calcIconOffset('prefix');
      calcIconOffset('suffix');
    };

    const handleInput = async (event: Event) => {
      recordCursor();

      let { value } = event.target as TargetElement;

      if (props.formatter) {
        value = props.parser ? props.parser(value) : value;
        value = props.formatter(value);
      }

      // should not emit input during composition
      // see: https://github.com/ElemeFE/element/issues/10516
      if (isComposing.value) return;

      // hack for https://github.com/ElemeFE/element/issues/8548
      // should remove the following line when we don't support IE
      if (value === nativeInputValue.value) return;

      emit(UPDATE_MODEL_EVENT, value);
      emit(INPUT_EVENT, value);

      // ensure native input value is controlled
      // see: https://github.com/ElemeFE/element/issues/12850
      await nextTick();
      setNativeInputValue();
      setCursor();
    };

    const handleChange = (event: Event) => {
      emit(CHANGE_EVENT, (event.target as TargetElement).value);
    };

    const handleCompositionStart = (event: CompositionEvent) => {
      emit('compositionstart', event);
      isComposing.value = true;
    };

    const handleCompositionUpdate = (event: CompositionEvent) => {
      emit('compositionupdate', event);
      const text = (event.target as HTMLInputElement)?.value;
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

    const handlePasswordVisible = () => {
      passwordVisible.value = !passwordVisible.value;
      focus();
    };

    const focus = async () => {
      // see: https://github.com/ElemeFE/element/issues/18573
      await nextTick();
      _ref.value?.focus();
    };

    const blur = () => _ref.value?.blur();

    const handleFocus = (event: FocusEvent) => {
      focused.value = true;
      emit(FOCUS_EVENT, event);
    };

    const handleBlur = (event: FocusEvent) => {
      focused.value = false;
      emit(BLUR_EVENT, event);
      if (props.validateEvent) {
        formItem?.validate?.('blur').catch((err) => debugWarn(err));
      }
    };

    const handleMouseLeave = (evt: MouseEvent) => {
      hovering.value = false;
      emit('mouseleave', evt);
    };

    const handleMouseEnter = (evt: MouseEvent) => {
      hovering.value = true;
      emit('mouseenter', evt);
    };

    const handleKeydown = (evt: KeyboardEvent) => {
      emit('keydown', evt);
    };

    const select = () => {
      _ref.value?.select();
    };

    const clear = () => {
      emit(UPDATE_MODEL_EVENT, '');
      emit('change', '');
      emit('clear');
      emit('input', '');
    };

    watch(
      () => props.modelValue,
      () => {
        nextTick(() => resizeTextarea());
        if (props.validateEvent) {
          formItem?.validate?.('change').catch((err) => debugWarn(err));
        }
      },
    );

    // native input value is set explicitly
    // do not use v-model / :value in template
    // see: https://github.com/ElemeFE/element/issues/14521
    watch(nativeInputValue, () => setNativeInputValue());

    // when change between <input> and <textarea>,
    // update DOM dependent value and styles
    // https://github.com/ElemeFE/element/issues/14857
    watch(
      () => props.type,
      async () => {
        await nextTick();
        setNativeInputValue();
        resizeTextarea();
        updateIconOffset();
      },
    );

    onMounted(async () => {
      if (!props.formatter && props.parser) {
        debugWarn('FzInput', 'If you set the parser, you also need to set the formatter.');
      }
      setNativeInputValue();
      updateIconOffset();
      await nextTick();
      resizeTextarea();
    });

    onUpdated(async () => {
      await nextTick();
      updateIconOffset();
    });

    expose({
      /** @description HTML input element */
      input,
      /** @description HTML textarea element */
      textarea,
      /** @description HTML element, input or textarea */
      ref: _ref,
      /** @description style of textarea. */
      textareaStyle,

      /** @description from props (used on unit test) */
      autosize: toRef(props, 'autosize'),

      /** @description HTML input element native method */
      focus,
      /** @description HTML input element native method */
      blur,
      /** @description HTML input element native method */
      select,
      /** @description clear input value */
      clear,
      /** @description resize textarea. */
      resizeTextarea,
    });

    return {
      input,
      textarea,
      attrs,
      focused,
      inputId,
      inputSize,
      inputDisabled,
      textareaStyle,
      suffixVisible,
      validateState,
      validateIcon,
      countStyle,
      containerStyle,
      containerAttrs,
      showClear,
      showPwdVisible,
      isWordLimitVisible,
      textLength,
      hovering,
      inputExceed,
      passwordVisible,
      passwordIcon,
      needStatusIcon,

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
      handleKeydown,
      handleMouseLeave,
      handleMouseEnter,
    };
  },
});
</script>
