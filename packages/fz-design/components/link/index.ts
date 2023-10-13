import Link from './src/link.vue'

import { install } from '../../utils'

export const FzLink = install(Link)

export type LinkInstance = InstanceType<typeof Link>

export * from './src/interface'

export default FzLink
