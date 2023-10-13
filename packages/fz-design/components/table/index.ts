import Table from './src/table.vue'

import { install } from '../../utils'

export const FzTable = install(Table)

export type TableInstance = InstanceType<typeof Table>

export * from './src/interface'

export default FzTable
