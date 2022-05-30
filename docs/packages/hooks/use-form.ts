import { inject, SetupContext, UnwrapRef } from 'vue';
import type { RuleItem, ValidateError, ValidateFieldsError } from 'async-validator';
import { FZ_FORM_INJECT_KEY, FZ_FORMITEM_INJECT_KEY } from '@fzui/constants';
import { FormItemProps, FormProps, FormEmits, FormItemProp, FormLabelWidthContext } from '@fzui/components';

import type { Arrayable } from '@fzui/utils';
import type { ComponentSize } from './use-size';

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
  const formItem = inject<FzFormItemContext | undefined>(FZ_FORMITEM_INJECT_KEY, undefined);
  return {
    form,
    formItem,
  };
};
