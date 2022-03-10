import { CHANGE_EVENT } from '@fzui/constants';
import { ExtractPropTypes, PropType } from 'vue';
import type Affix from './Affix.vue';

export const affixEmits = {
  scroll: ({ scrollTop, fixed }: { scrollTop: number; fixed: boolean }) => typeof scrollTop === 'number' && typeof fixed === 'boolean',
  [CHANGE_EVENT]: (fixed: boolean) => typeof fixed === 'boolean',
};

export const affixProps = {
  zIndex: {
    type: [Number, String],
    default: 100,
  },
  target: {
    type: String,
    default: '',
  },
  offset: {
    type: Number,
    default: 0,
  },
  position: {
    type: String as PropType<'top' | 'bottom'>,
    default: 'top',
  },
};

export type AffixProps = ExtractPropTypes<typeof affixProps>;
export type AffixEmits = typeof affixEmits;
export type AffixInstance = InstanceType<typeof Affix>;
