import { ExtractPropTypes } from 'vue';
import { isBoolean } from '@fzui/utils';
import { CHANGE_EVENT, UPDATE_CHECKED_EVENT } from '@fzui/constants';

import type CheckTag from './CheckTag.vue';

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
