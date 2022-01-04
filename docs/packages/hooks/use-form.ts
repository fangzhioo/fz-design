import { inject } from 'vue';
import { FZ_FORM_INJECT_KEY, FZ_FORMITEM_INJECT_KEY } from 'packages/utils/constants';
import { ComponentSize } from './use-size';

export interface ValidateFieldCallback {
  (isValid?: string, invalidFields?: any): void;
}

export interface FzFormItemContext {
  prop?: string;
  size?: ComponentSize;
  validateState: string;
  $el: HTMLDivElement;
  validate(trigger: string, callback?: ValidateFieldCallback): void;
  updateComputedLabelWidth(width: number): void;
  evaluateValidationEnabled(): void;
  resetField(): void;
  clearValidate(): void;
}
export interface FzFormContext {
  registerLabelWidth(width: number, oldWidth: number): void;
  deregisterLabelWidth(width: number): void;
  autoLabelWidth: string | undefined;
  emit: (evt: string, ...args: any[]) => void;
  addField: (field: FzFormItemContext) => void;
  removeField: (field: FzFormItemContext) => void;
  resetFields: () => void;
  clearValidate: (props: string | string[]) => void;
  validateField: (props: string | string[], cb: ValidateFieldCallback) => void;
  labelSuffix: string;
  inline?: boolean;
  inlineMessage?: boolean;
  model?: Record<string, unknown>;
  size?: ComponentSize;
  showMessage?: boolean;
  labelPosition?: string;
  labelWidth?: string | number;
  rules?: Record<string, unknown>;
  statusIcon?: boolean;
  hideRequiredAsterisk?: boolean;
  disabled?: boolean;
}

export const useForm = () => {
  const form = inject<FzFormContext | undefined>(FZ_FORM_INJECT_KEY, undefined);
  const formItem = inject<FzFormItemContext | undefined>(FZ_FORMITEM_INJECT_KEY, undefined);
  return {
    form,
    formItem,
  };
};
