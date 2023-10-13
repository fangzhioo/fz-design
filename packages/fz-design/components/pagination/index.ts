import Pagination from './src/pagination.vue'

import { install } from '../../utils'

export const FzPagination = install(Pagination)

export type PaginationInstance = InstanceType<typeof Pagination>

export * from './src/interface'

export default FzPagination
