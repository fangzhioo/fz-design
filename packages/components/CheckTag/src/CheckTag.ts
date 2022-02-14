import { ExtractPropTypes } from 'vue';
import { isBoolean } from '@fzui/utils';
import type CheckTag from './CheckTag.vue';
import { CHANGE_EVENT, UPDATE_CHECKED_EVENT } from '@fzui/constants';

export const checkTagEmits = {
  [UPDATE_CHECKED_EVENT]: (value: boolean) => isBoolean(value),
  [CHANGE_EVENT]: (value: boolean) => isBoolean(value),
};

export const checkTagProps = {
  checked: {
    type: Boolean,
    default: false,
  },
};

export type CheckTagProps = ExtractPropTypes<typeof checkTagProps>;
export type CheckTagEmits = typeof checkTagEmits;
export type CheckTagInstance = InstanceType<typeof CheckTag>;
