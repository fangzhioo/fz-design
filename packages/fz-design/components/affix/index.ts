import Affix from './src/affix.vue'

import { install } from '../../utils'

export const FzAffix = install(Affix)

export type AffixInstance = InstanceType<typeof Affix>

export * from './src/interface'

export default FzAffix
