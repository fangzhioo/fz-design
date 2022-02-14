import { ExtractPropTypes, PropType } from 'vue';
import { ComponentSize } from '@fzui/hooks/use-size';
import { Theme } from '@fzui/hooks/use-theme';
import { Language } from '@fzui/locale';

export const configProviderProps = {
  locale: {
    type: Object as PropType<Language>,
  },
  size: {
    type: String as PropType<ComponentSize>,
    default: 'medium',
  },
  theme: {
    type: String as PropType<Theme>,
    default: '',
  },
  zIndex: {
    type: Number,
    default: 2000,
  },
};

export type ConfigProviderContext = ExtractPropTypes<typeof configProviderProps>;
