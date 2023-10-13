import Space from './src/space.vue'

import { install } from '../../utils'

export const FzSpace = install(Space)

export type SpaceInstance = InstanceType<typeof Space>

export * from './src/interface'

export default FzSpace
