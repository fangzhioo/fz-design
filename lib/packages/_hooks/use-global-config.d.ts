import type { Ref } from 'vue';
import { ConfigProviderContext } from '../ConfigProvider/src/ConfigProvider';
export declare function useGlobalConfig<K extends keyof ConfigProviderContext>(key: K): Ref<ConfigProviderContext[K]>;
export declare function useGlobalConfig(): ConfigProviderContext;
