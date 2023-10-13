import Dialog from './src/dialog.vue'

import { install } from '../../utils'

export const FzDialog = install(Dialog)

export type DialogInstance = InstanceType<typeof Dialog>

export * from './src/interface'

export default FzDialog
