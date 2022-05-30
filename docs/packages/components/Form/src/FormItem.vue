<template>
  <div ref="formItemRef" :class="formItemClasses" :role="isGroup ? 'group' : undefined" :aria-labelledby="isGroup ? labelId : undefined">
    <form-item-label :is-auto-width="labelStyle.width === 'auto'" :update-all="formContext?.labelWidth === 'auto'">
      <component :is="labelFor ? 'label' : 'div'" v-if="hasLabel" :id="labelId" :for="labelFor" class="fz-form-item__label" :style="labelStyle">
        <slot name="label" :label="currentLabel">
          {{ currentLabel }}
        </slot>
      </component>
    </form-item-label>

    <div class="fz-form-item__content" :style="contentStyle">
      <slot />
      <transition name="fz-zoom-in-top">
        <slot v-if="shouldShowError" name="error" :error="validateMessage">
          <div :class="validateClasses">
            {{ validateMessage }}
          </div>
        </slot>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, CSSProperties, defineComponent, inject, nextTick, onBeforeUnmount, onMounted, provide, reactive, ref, toRefs, watch } from 'vue';
import AsyncValidator from 'async-validator';
import { refDebounced } from '@vueuse/core';
import { FZ_FORMITEM_INJECT_KEY, FZ_FORM_INJECT_KEY } from '@fzui/constants';
import { FormItemRule, FormValidateFailure, FzFormContext, FzFormItemContext, useId, useSize } from '@fzui/hooks';
import { addUnit, Arrayable, castArray, clone, isBoolean, isEqual, isFunction, isString, getProp } from '@fzui/utils';
import { FormItemValidateState } from '@fzui/components';
import { formItemProps, formItemEmits } from './FormItem';
import FormItemLabel from './FormItemLabel.vue';

import type { RuleItem } from 'async-validator';

export default defineComponent({
  name: 'FzFormItem',
  components: { FormItemLabel },
  props: formItemProps,
  emits: formItemEmits,
  setup(props, { slots }) {
    const formContext = inject<FzFormContext | undefined>(FZ_FORM_INJECT_KEY, undefined);
    const parentFormItemContext = inject<FzFormItemContext | undefined>(FZ_FORMITEM_INJECT_KEY, undefined);

    const _size = useSize(undefined, { formItem: false });
    // const ns = useNamespace('form-item')

    const labelId = useId().value;
    const inputIds = ref<string[]>([]);

    const validateState = ref<FormItemValidateState>('');
    const validateStateDebounced = refDebounced(validateState, 100);
    const validateMessage = ref('');
    const formItemRef = ref<HTMLDivElement>();
    // special inline value.
    let initialValue: any = undefined;
    let isResettingField = false;

    const labelStyle = computed<CSSProperties>(() => {
      if (formContext?.labelPosition === 'top') {
        return {};
      }

      const labelWidth = addUnit(props.labelWidth || formContext?.labelWidth || '');
      if (labelWidth) return { width: labelWidth };
      return {};
    });

    const contentStyle = computed<CSSProperties>(() => {
      if (formContext?.labelPosition === 'top' || formContext?.inline) {
        return {};
      }
      if (!props.label && !props.labelWidth && isNested) {
        return {};
      }
      const labelWidth = addUnit(props.labelWidth || formContext?.labelWidth || '');
      if (!props.label && !slots.label) {
        return { marginLeft: labelWidth };
      }
      return {};
    });

    const formItemClasses = computed(() => [
      'fz-form-item',
      `fz-form-item--${_size.value}`,
      {
        'is-error': validateState.value === 'error',
        'is-validating': validateState.value === 'validating',
        'is-success': validateState.value === 'success',
        'is-required': isRequired.value || props.required,
        'is-no-asterisk': formContext?.hideRequiredAsterisk,
        'fz-form-item--feedback': formContext?.statusIcon,
      },
    ]);

    const _inlineMessage = computed(() => (isBoolean(props.inlineMessage) ? props.inlineMessage : formContext?.inlineMessage || false));

    const validateClasses = computed(() => [
      'fz-form-item__error',
      {
        'fz-form-item__error--inline': _inlineMessage.value,
      },
    ]);

    const propString = computed(() => {
      if (!props.prop) return '';
      return isString(props.prop) ? props.prop : props.prop.join('.');
    });

    const hasLabel = computed<boolean>(() => {
      return !!(props.label || slots.label);
    });

    const labelFor = computed<string | undefined>(() => {
      return props.for || inputIds.value.length === 1 ? inputIds.value[0] : undefined;
    });

    const isGroup = computed<boolean>(() => {
      return !labelFor.value && hasLabel.value;
    });

    const isNested = !!parentFormItemContext;

    const fieldValue = computed(() => {
      const model = formContext?.model;
      if (!model || !props.prop) {
        return;
      }
      return getProp(model, props.prop).value;
    });

    const _rules = computed(() => {
      const rules: FormItemRule[] = props.rules ? castArray(props.rules) : [];

      const formRules = formContext?.rules;
      if (formRules && props.prop) {
        const _rules = getProp<Arrayable<FormItemRule> | undefined>(formRules, props.prop).value;
        if (_rules) {
          rules.push(...castArray(_rules));
        }
      }

      if (props.required !== undefined) {
        rules.push({ required: !!props.required });
      }

      return rules;
    });

    const validateEnabled = computed(() => _rules.value.length > 0);

    const getFilteredRule = (trigger: string) => {
      const rules = _rules.value;
      return rules
        .filter((rule) => {
          if (!rule.trigger || !trigger) return true;
          if (Array.isArray(rule.trigger)) {
            return rule.trigger.includes(trigger);
          } else {
            return rule.trigger === trigger;
          }
        })
        .map(({ trigger, ...rule }): RuleItem => rule);
    };

    const isRequired = computed(() => _rules.value.some((rule) => rule.required === true));

    const shouldShowError = computed(() => validateStateDebounced.value === 'error' && props.showMessage && (formContext?.showMessage ?? true));

    const currentLabel = computed(() => `${props.label || ''}${formContext?.labelSuffix || ''}`);

    const setValidationState = (state: FormItemValidateState) => {
      validateState.value = state;
    };

    const onValidationFailed = (error: FormValidateFailure) => {
      const { errors, fields } = error;
      if (!errors || !fields) {
        console.error(error);
      }

      setValidationState('error');
      validateMessage.value = errors ? errors?.[0]?.message ?? `${props.prop} is required` : '';

      formContext?.emit('validate', props.prop!, false, validateMessage.value);
    };

    const onValidationSucceeded = () => {
      setValidationState('success');
      formContext?.emit('validate', props.prop!, true, '');
    };

    const doValidate = async (rules: RuleItem[]): Promise<boolean> => {
      const modelName = propString.value;
      const validator = new AsyncValidator({
        [modelName]: rules,
      });
      return validator
        .validate({ [modelName]: fieldValue.value }, { firstFields: true })
        .then(() => {
          onValidationSucceeded();
          return true;
        })
        .catch((err: FormValidateFailure) => {
          onValidationFailed(err as FormValidateFailure);
          return Promise.reject(err);
        });
    };

    const validate: FzFormItemContext['validate'] = async (trigger, callback) => {
      // skip validation if its resetting
      if (isResettingField) {
        isResettingField = false;
        return false;
      }

      const hasCallback = isFunction(callback);
      if (!validateEnabled.value) {
        callback?.(false);
        return false;
      }

      const rules = getFilteredRule(trigger);
      if (rules.length === 0) {
        callback?.(true);
        return true;
      }

      setValidationState('validating');

      return doValidate(rules)
        .then(() => {
          callback?.(true);
          return true;
        })
        .catch((err: FormValidateFailure) => {
          const { fields } = err;
          callback?.(false, fields);
          return hasCallback ? false : Promise.reject(fields);
        });
    };

    const clearValidate: FzFormItemContext['clearValidate'] = () => {
      setValidationState('');
      validateMessage.value = '';
    };

    const resetField: FzFormItemContext['resetField'] = async () => {
      const model = formContext?.model;
      if (!model || !props.prop) return;

      const computedValue = getProp(model, props.prop);

      if (!isEqual(computedValue.value, initialValue)) {
        // prevent validation from being triggered
        isResettingField = true;
      }

      computedValue.value = initialValue;

      await nextTick();
      clearValidate();
    };

    const addInputId: FzFormItemContext['addInputId'] = (id: string) => {
      if (!inputIds.value.includes(id)) {
        inputIds.value.push(id);
      }
    };

    const removeInputId: FzFormItemContext['removeInputId'] = (id: string) => {
      inputIds.value = inputIds.value.filter((listId) => listId !== id);
    };

    watch(
      () => props.error,
      (val) => {
        validateMessage.value = val || '';
        setValidationState(val ? 'error' : '');
      },
      { immediate: true },
    );

    watch(
      () => props.validateStatus,
      (val) => setValidationState(val || ''),
    );

    const context: FzFormItemContext = reactive({
      ...toRefs(props),
      $el: formItemRef,
      size: _size,
      validateState,
      labelId,
      inputIds,
      isGroup,
      addInputId,
      removeInputId,
      resetField,
      clearValidate,
      validate,
    });

    provide(FZ_FORMITEM_INJECT_KEY, context);

    onMounted(() => {
      if (props.prop) {
        formContext?.addField(context);
        initialValue = clone(fieldValue.value);
      }
    });

    onBeforeUnmount(() => {
      formContext?.removeField(context);
    });

    return {
      formItemClasses,
      isGroup,
      labelId,
      labelStyle,
      formContext,
      labelFor,
      hasLabel,
      currentLabel,
      contentStyle,
      shouldShowError,
      validateMessage,
      validateClasses,
    };
  },
});
</script>
