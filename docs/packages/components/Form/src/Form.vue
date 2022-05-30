<template>
  <form :class="formClasses">
    <slot />
  </form>
</template>

<script lang="ts">
import { computed, defineComponent, provide, reactive, watch, toRefs } from 'vue';
import { FormItemProp } from '@fzui/components';
import { FormValidateCallback, FormValidationResult, FzFormContext, FzFormItemContext, useSize } from '@fzui/hooks';
import { Arrayable, debugWarn, isFunction } from '@fzui/utils';
import { ValidateFieldsError } from 'async-validator';
import { formEmits, formProps } from './Form';
import { filterFields, useFormLabelWidth } from './utils';
import { FZ_FORM_INJECT_KEY } from '@fzui/constants';

const COMPONENT_NAME = 'FzForm';

export default defineComponent({
  name: COMPONENT_NAME,
  props: formProps,
  emits: formEmits,
  setup(props, context) {
    const { emit, expose } = context;
    const fields: FzFormItemContext[] = [];

    const formSize = useSize();

    const formClasses = computed(() => {
      const { labelPosition, inline } = props;
      return [
        'fz-form',
        `fz-form--${formSize.value}`,
        `fz-form--label-${labelPosition}`,
        {
          'fz-form--inline': inline,
        },
      ];
    });

    const addField: FzFormContext['addField'] = (field) => {
      fields.push(field);
    };

    const removeField: FzFormContext['removeField'] = (field) => {
      if (field.prop) {
        fields.splice(fields.indexOf(field), 1);
      }
    };

    const resetFields: FzFormContext['resetFields'] = (properties = []) => {
      if (!props.model) {
        debugWarn(COMPONENT_NAME, 'model is required for resetFields to work.');
        return;
      }
      filterFields(fields, properties).forEach((field) => field.resetField());
    };

    const clearValidate: FzFormContext['clearValidate'] = (props = []) => {
      filterFields(fields, props).forEach((field) => field.clearValidate());
    };

    const isValidatable = computed(() => {
      const hasModel = !!props.model;
      if (!hasModel) {
        debugWarn(COMPONENT_NAME, 'model is required for validate to work.');
      }
      return hasModel;
    });

    const obtainValidateFields = (props: Arrayable<FormItemProp>) => {
      if (fields.length === 0) return [];

      const filteredFields = filterFields(fields, props);
      if (!filteredFields.length) {
        debugWarn(COMPONENT_NAME, 'please pass correct props!');
        return [];
      }
      return filteredFields;
    };

    const validate = async (callback?: FormValidateCallback): FormValidationResult => validateField(undefined, callback);

    const doValidateField = async (props: Arrayable<FormItemProp> = []): Promise<boolean> => {
      if (!isValidatable.value) return false;

      const fields = obtainValidateFields(props);
      if (fields.length === 0) return true;

      let validationErrors: ValidateFieldsError = {};
      for (const field of fields) {
        try {
          await field.validate('');
        } catch (fields) {
          validationErrors = {
            ...validationErrors,
            ...(fields as ValidateFieldsError),
          };
        }
      }

      if (Object.keys(validationErrors).length === 0) return true;
      return Promise.reject(validationErrors);
    };

    const validateField: FzFormContext['validateField'] = async (modelProps = [], callback) => {
      const shouldThrow = !isFunction(callback);
      try {
        const result = await doValidateField(modelProps);
        // When result is false meaning that the fields are not validatable
        if (result === true) {
          callback?.(result);
        }
        return result;
      } catch (e) {
        const invalidFields = e as ValidateFieldsError;

        if (props.scrollToError) {
          scrollToField(Object.keys(invalidFields)[0]);
        }
        callback?.(false, invalidFields);
        return shouldThrow && Promise.reject(invalidFields);
      }
    };

    const scrollToField = (prop: FormItemProp) => {
      const field = filterFields(fields, prop)[0];
      if (field) {
        field.$el?.scrollIntoView();
      }
    };

    watch(
      () => props.rules,
      () => {
        if (props.validateOnRuleChange) validate();
      },
      { deep: true },
    );

    provide(
      FZ_FORM_INJECT_KEY,
      reactive({
        ...toRefs(props),
        emit,

        resetFields,
        clearValidate,
        validateField,
        addField,
        removeField,

        ...useFormLabelWidth(),
      }),
    );

    expose({
      /** @description validate form */
      validate,
      /** @description validate form field */
      validateField,
      /** @description reset fields */
      resetFields,
      /** @description clear validation status */
      clearValidate,
      /** @description scroll to field */
      scrollToField,
    });

    return {
      formClasses,
    };
  },
});
</script>
