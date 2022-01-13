import { ExtractPropTypes, PropType } from 'vue';
import type Autocomplete from './Autocomplete.vue';
import type { Placement } from '@fzui/components/Popper';
import { NOOP } from '@vue/shared';
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '@fzui/utils/constants';

export const autocompleteEmits = [UPDATE_MODEL_EVENT, CHANGE_EVENT, 'input', 'focus', 'blur', 'clear', 'select'];

export const autocompleteProps = {
  valueKey: {
    type: String,
    default: 'value',
  },
  modelValue: {
    type: [String, Number],
    default: '',
  },
  debounce: {
    type: Number,
    default: 300,
  },
  placement: {
    type: String as PropType<Placement>,
    validator: (val: string): boolean => {
      return ['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end'].includes(val);
    },
    default: 'bottom-start',
  },
  fetchSuggestions: {
    type: Function as PropType<(queryString: string | number, cb: (data: any[]) => void) => void>,
    default: NOOP,
  },
  popperClass: {
    type: String,
    default: '',
  },
  triggerOnFocus: {
    type: Boolean,
    default: true,
  },
  selectWhenUnmatched: {
    type: Boolean,
    default: false,
  },
  hideLoading: {
    type: Boolean,
    default: false,
  },
  popperAppendToBody: {
    type: Boolean,
    default: true,
  },
  highlightFirstItem: {
    type: Boolean,
    default: false,
  },
};

export type AutocompleteProps = ExtractPropTypes<typeof autocompleteProps>;
export type AutocompleteEmits = typeof autocompleteEmits;
export type AutocompleteInstance = InstanceType<typeof Autocomplete>;
