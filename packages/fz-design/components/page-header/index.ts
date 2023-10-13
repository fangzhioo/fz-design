import PageHeader from './src/page-header.vue'

import { install } from '../../utils'

export const FzPageHeader = install(PageHeader)

export type PageHeaderInstance = InstanceType<typeof PageHeader>

export * from './src/interface'

export default FzPageHeader
