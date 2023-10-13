import Breadcrumb from './src/breadcrumb.vue'

import { install } from '../../utils'

export const FzBreadcrumb = install(Breadcrumb)

export type BreadcrumbInstance = InstanceType<typeof Breadcrumb>

export * from './src/interface'

export default FzBreadcrumb
