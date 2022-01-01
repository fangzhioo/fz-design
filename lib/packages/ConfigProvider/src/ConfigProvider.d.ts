import { ComponentSize } from '../../_hooks/use-size';
import { Theme } from '../../_hooks/use-theme';
import { Language } from '../../_locale';
import { ExtractPropTypes, PropType } from 'vue';
export declare const configProviderProps: {
    locale: {
        type: PropType<Language>;
    };
    size: {
        type: PropType<ComponentSize>;
        default: string;
    };
    theme: {
        type: PropType<Theme>;
        default: string;
    };
};
export declare type ConfigProviderContext = ExtractPropTypes<typeof configProviderProps>;
