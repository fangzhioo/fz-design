import ConfigProvider from './src/config-provider.vue'

import { install } from '../../utils'

export const FzConfigProvider = install(ConfigProvider)

export type ConfigProviderInstance = InstanceType<typeof ConfigProvider>

export * from './src/interface'

export default FzConfigProvider
