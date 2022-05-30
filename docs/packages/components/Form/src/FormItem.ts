import { FormItemRule } from '@fzui/hooks';
import { Arrayable } from '@fzui/utils';
import { ExtractPropTypes, PropType } from 'vue';

import type { FormSize } from './Form';

export type FormItemProp = Arrayable<string>;

export type FormItemValidateState = '' | 'error' | 'validating' | 'success';

export const formItemProps = {
  label: String,
  labelWidth: {
    type: [String, Number],
    default: '',
  },
  prop: {
    type: [String, Array] as PropType<FormItemProp>,
  },
  required: {
    type: Boolean,
    default: undefined,
  },
  rules: {
    type: [Object, Array] as PropType<Arrayable<FormItemRule>>,
  },
  error: String,
  validateStatus: {
    type: String as PropType<FormItemValidateState>,
  },
  for: String,
  inlineMessage: {
    type: [String, Boolean],
    default: '',
  },
  showMessage: {
    type: Boolean,
    default: true,
  },
  size: {
    type: String as PropType<FormSize>,
  },
};

export const formItemEmits = {};

export type FormItemProps = ExtractPropTypes<typeof formItemProps>;
export type FormItemEmits = typeof formItemEmits;

import type { useFormLabelWidth } from './utils';
export type FormLabelWidthContext = ReturnType<typeof useFormLabelWidth>;
