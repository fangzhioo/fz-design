/* eslint-disable no-use-before-define */
import { TagType } from '@fzui/components/Tag/src/Tag';
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '@fzui/constants';
import { ComponentSize } from '@fzui/hooks';
import { ExtractPropTypes, PropType, Ref } from 'vue';
import type Select from './Select.vue';

export type SelectSize = ComponentSize;
export const selectEmits = [UPDATE_MODEL_EVENT, CHANGE_EVENT, 'remove-tag', 'clear', 'visible-change', 'focus', 'blur'];

export const selectProps = {
  modelValue: {
    type: [Array, String, Number, Boolean, Object],
    default: undefined,
  },
  autocomplete: {
    type: String,
    default: 'off',
  },
  name: String,
  id: String,
  automaticDropdown: Boolean,
  size: {
    type: String as PropType<SelectSize>,
  },
  disabled: Boolean,
  clearable: Boolean,
  filterable: Boolean,
  allowCreate: Boolean,
  loading: Boolean,
  popperClass: {
    type: String,
    default: '',
  },
  remote: Boolean,
  loadingText: String,
  noMatchText: String,
  noDataText: String,
  remoteMethod: Function,
  filterMethod: Function,
  multiple: Boolean,
  multipleLimit: {
    type: Number,
    default: 0,
  },
  placeholder: {
    type: String,
  },
  defaultFirstOption: Boolean,
  reserveKeyword: {
    type: Boolean,
    default: true,
  },
  valueKey: {
    type: String,
    default: 'value',
  },
  collapseTags: Boolean,
  popperAppendToBody: {
    type: Boolean,
    default: undefined,
  },
  teleported: {
    type: Boolean,
    default: true,
  },
  clearIcon: {
    type: String,
    default: 'delete-filling',
  },
  fitInputWidth: {
    type: Boolean,
    default: false,
  },
  suffixIcon: {
    type: String,
    default: 'arrow-up-bold',
  },
  tagType: {
    type: String as PropType<TagType>,
    default: 'info',
  },
};

export const selectOptionProps = {
  value: {
    required: true,
    type: [String, Number, Boolean, Object],
  },
  label: [String, Number],
  created: Boolean,
  disabled: {
    type: Boolean,
    default: false,
  },
};

export const selectOptionGroupProps = {
  label: String,
  disabled: {
    type: Boolean,
    default: false,
  },
};

export interface SelectGroupContext {
  disabled: boolean;
}

export interface QueryChangeCtx {
  query: string;
}

export interface SelectContext {
  props: {
    multiple?: boolean;
    multipleLimit?: number;
    valueKey?: string;
    modelValue?: string | number | unknown | unknown[];
    popperClass?: string;
    remote?: boolean;
    fitInputWidth?: boolean;
  };
  queryChange: Ref<QueryChangeCtx>;
  groupQueryChange: Ref<string>;
  selectWrapper: HTMLElement;
  cachedOptions: Map<any, any>;
  hoverIndex: number;
  optionsCount: number;
  filteredOptionsCount: number;
  options: Map<any, any>;
  optionsArray: any[];
  selected: any | any[];
  setSelected(): void;
  onOptionCreate(vm: SelectOptionProxy): void;
  onOptionDestroy(key: number | string | Record<string, any>): void;
  handleOptionSelect(vm: unknown, byClick: boolean): void;
}

export interface SelectOptionProxy {
  value: string | number | Record<string, string>;
  label: string | number;
  created: boolean;
  disabled: boolean;
  currentLabel: string;
  itemSelected: boolean;
  isDisabled: boolean;
  select: SelectContext;
  hoverItem: () => void;
  visible: boolean;
  hover: boolean;
  selectOptionClick: () => void;
}

export type SelectProps = ExtractPropTypes<typeof selectProps>;
export type SelectEmits = typeof selectEmits;
export type SelectInstance = InstanceType<typeof Select>;

export type SelectOptionProps = ExtractPropTypes<typeof selectOptionProps>;
