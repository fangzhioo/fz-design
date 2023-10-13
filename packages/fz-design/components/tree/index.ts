import Tree from './src/tree.vue'

import { install } from '../../utils'

export const FzTree = install(Tree)

export type TreeInstance = InstanceType<typeof Tree>

export * from './src/interface'

export default FzTree
