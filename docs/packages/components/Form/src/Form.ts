import { ExtractPropTypes, PropType } from 'vue';
import { isArray, isBoolean, isString } from '@fzui/utils';
import { ComponentSize, FormRules } from '@fzui/hooks';
import Form from './Form.vue';

import type { FormItemProp } from './FormItem';

export type FormSize = ComponentSize;

export const formProps = {
  model: Object,
  rules: {
    type: Object as PropType<FormRules>,
  },
  labelPosition: String,
  labelWidth: {
    type: [String, Number],
    default: '',
  },
  labelSuffix: {
    type: String,
    default: '',
  },
  inline: Boolean,
  inlineMessage: Boolean,
  statusIcon: Boolean,
  showMessage: {
    type: Boolean,
    default: true,
  },
  size: {
    type: String as PropType<FormSize>,
  },
  disabled: Boolean,
  validateOnRuleChange: {
    type: Boolean,
    default: true,
  },
  hideRequiredAsterisk: {
    type: Boolean,
    default: false,
  },
  scrollToError: Boolean,
};

export const formEmits = {
  validate: (prop: FormItemProp, isValid: boolean, message: string) => (isArray(prop) || isString(prop)) && isBoolean(isValid) && isString(message),
};

export type FormProps = ExtractPropTypes<typeof formProps>;
export type FormEmits = typeof formEmits;
export type FormInstance = InstanceType<typeof Form>;
