import Col from './src/col.vue'

import { install } from '../../utils'

export const FzCol = install(Col)

export type ColInstance = InstanceType<typeof Col>

export * from './src/interface'

export default FzCol
