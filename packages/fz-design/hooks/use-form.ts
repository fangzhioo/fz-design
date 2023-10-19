import { computed, ComputedRef, inject, onMounted, onUnmounted, ref, Ref, SetupContext, toRef, UnwrapRef, watch, WatchStopHandle } from 'vue';
// import type { RuleItem, ValidateError, ValidateFieldsError } from 'async-validator';
import { FZ_FORM_INJECT_KEY, FZ_FORM_ITEM_INJECT_KEY } from '../constants';

// TODO type
type RuleItem = any;
type ValidateError = any;
type ValidateFieldsError = any;
type FormItemProps = any;
type FormProps = any;
type FormEmits = any
type FormItemProp = any
type FormLabelWidthContext = any

import type { Arrayable } from '../types';
import type { ComponentSize } from './use-size';
import { useId } from './use-id';

export interface FormItemRule extends RuleItem {
  trigger?: Arrayable<string>;
}
export type FormRules = Partial<Record<string, Arrayable<FormItemRule>>>;

export type FormValidationResult = Promise<boolean>;
export type FormValidateCallback = (isValid: boolean, invalidFields?: ValidateFieldsError) => void;
export interface FormValidateFailure {
  errors: ValidateError[] | null;
  fields: ValidateFieldsError;
}

export interface FzFormItemContext extends FormItemProps {
  $el?: HTMLDivElement;
  size?: ComponentSize;
  validateState: string;
  isGroup: boolean;
  labelId: string;
  inputIds: string[];
  addInputId: (id: string) => void;
  removeInputId: (id: string) => void;
  validate: (trigger: string, callback?: FormValidateCallback) => FormValidationResult;
  resetField: () => void;
  clearValidate: () => void;
}

export type FzFormContext = FormProps &
  UnwrapRef<FormLabelWidthContext> & {
    emit: SetupContext<FormEmits>['emit'];

    // expose
    addField: (field: FzFormItemContext) => void;
    removeField: (field: FzFormItemContext) => void;
    resetFields: (props?: Arrayable<FormItemProp>) => void;
    clearValidate: (props?: Arrayable<FormItemProp>) => void;
    validateField: (props?: Arrayable<FormItemProp>, callback?: FormValidateCallback) => FormValidationResult;
  };

export const useForm = () => {
  const form = inject<FzFormContext | undefined>(FZ_FORM_INJECT_KEY, undefined);
  const formItem = inject<FzFormItemContext | undefined>(FZ_FORM_ITEM_INJECT_KEY, undefined);
  return {
    form,
    formItem,
  };
};

export type IUseFormItemInputCommonProps = {
  id?: string;
  label?: string | number | boolean | Record<string, any>;
};

export const useFormItemInputId = (
  props: Partial<IUseFormItemInputCommonProps>,
  {
    formItemContext,
    disableIdGeneration,
    disableIdManagement,
  }: {
    formItemContext?: FzFormItemContext;
    disableIdGeneration?: ComputedRef<boolean> | Ref<boolean>;
    disableIdManagement?: ComputedRef<boolean> | Ref<boolean>;
  },
) => {
  if (!disableIdGeneration) {
    disableIdGeneration = ref<boolean>(false);
  }
  if (!disableIdManagement) {
    disableIdManagement = ref<boolean>(false);
  }

  const inputId = ref<string>();
  let idUnwatch: WatchStopHandle | undefined = undefined;

  const isLabeledByFormItem = computed<boolean>(() => {
    return !!(!props.label && formItemContext && formItemContext.inputIds && formItemContext.inputIds?.length <= 1);
  });

  // Generate id for ElFormItem label if not provided as prop
  onMounted(() => {
    idUnwatch = watch(
      [toRef(props, 'id'), disableIdGeneration] as any,
      ([id, disableIdGeneration]: [string, boolean]) => {
        const newId = id ?? (!disableIdGeneration ? useId().value : undefined);
        if (newId !== inputId.value) {
          if (formItemContext?.removeInputId) {
            inputId.value && formItemContext.removeInputId(inputId.value);
            if (!disableIdManagement?.value && !disableIdGeneration && newId) {
              formItemContext.addInputId(newId);
            }
          }
          inputId.value = newId;
        }
      },
      { immediate: true },
    );
  });

  onUnmounted(() => {
    idUnwatch && idUnwatch();
    if (formItemContext?.removeInputId) {
      inputId.value && formItemContext.removeInputId(inputId.value);
    }
  });

  return {
    isLabeledByFormItem,
    inputId,
  };
};
