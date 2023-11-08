import Popconfirm from './src/popconfirm.vue'

import { install } from '../../utils'

export const FzPopconfirm = install(Popconfirm)

export type PopconfirmInstance = InstanceType<typeof Popconfirm>

export * from './src/interface'

export default FzPopconfirm
