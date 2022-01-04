import { ComponentSize } from 'packages/hooks/use-size';
import { Theme } from 'packages/hooks/use-theme';
import { Language } from 'packages/locale';
import { ExtractPropTypes, PropType } from 'vue';

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
};

export type ConfigProviderContext = ExtractPropTypes<typeof configProviderProps>;
