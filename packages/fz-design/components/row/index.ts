import Row from './src/row.vue'

import { install } from '../../utils'

export const FzRow = install(Row)

export type RowInstance = InstanceType<typeof Row>

export * from './src/interface'

export default FzRow
