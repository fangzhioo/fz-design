import type { ExtractPropTypes, PropType } from 'vue';
import { ComponentSize } from '@fzui/hooks/use-size';
import { UPDATE_MODEL_EVENT } from '@fzui/utils/constants';
import { isString } from '@fzui/utils';
import type Input from './Input.vue';

export type InputModelValue = string | number | null | undefined;
export type InputSize = ComponentSize;
export type AutoSize = { minRows?: number; maxRows?: number } | boolean;
export type TargetElement = HTMLInputElement | HTMLTextAreaElement;

export const ValidateIconsMap: Record<string, string> = {
  validating: 'loading',
  success: 'success-filling',
  error: 'delete-filling',
};

export const PENDANT_MAP = {
  suffix: 'append',
  prefix: 'prepend',
} as const;

export const inputProps = {
  size: {
    type: String as PropType<InputSize>,
  },
  disabled: Boolean,
  modelValue: {
    type: [String, Number] as PropType<InputModelValue>,
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  resize: {
    type: String,
    values: ['none', 'both', 'horizontal', 'vertical'],
  },
  autosize: {
    type: [Boolean, Object] as PropType<AutoSize>,
    default: false,
  },
  autocomplete: {
    type: String,
    default: 'off',
  },
  placeholder: {
    type: String,
  },
  form: {
    type: String,
    default: '',
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  clearable: {
    type: Boolean,
    default: false,
  },
  showPassword: {
    type: Boolean,
    default: false,
  },
  showWordLimit: {
    type: Boolean,
    default: false,
  },
  suffixIcon: {
    type: String,
    default: '',
  },
  prefixIcon: {
    type: String,
    default: '',
  },
  label: {
    type: String,
  },
  tabindex: {
    type: [Number, String],
  },
  validateEvent: {
    type: Boolean,
    default: true,
  },
  inputStyle: {
    type: [Object, Array, String] as PropType<object | Record<string, unknown> | string>,
    default: () => ({}),
  },
};

export const inputEmits = {
  [UPDATE_MODEL_EVENT]: (value: string) => isString(value),
  input: (value: string) => isString(value),
  change: (value: string) => isString(value),
  focus: (evt: FocusEvent) => evt instanceof FocusEvent,
  blur: (evt: FocusEvent) => evt instanceof FocusEvent,
  clear: () => true,
  mouseleave: (evt: MouseEvent) => evt instanceof MouseEvent,
  mouseenter: (evt: MouseEvent) => evt instanceof MouseEvent,
  keydown: (evt: KeyboardEvent) => evt instanceof KeyboardEvent,
  compositionstart: (evt: CompositionEvent) => evt instanceof CompositionEvent,
  compositionupdate: (evt: CompositionEvent) => evt instanceof CompositionEvent,
  compositionend: (evt: CompositionEvent) => evt instanceof CompositionEvent,
};

export type InputProps = ExtractPropTypes<typeof inputProps>;
export type InputEmits = typeof inputEmits;
export type InputInstance = InstanceType<typeof Input>;
