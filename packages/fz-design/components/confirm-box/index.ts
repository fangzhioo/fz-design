import ConfirmBox from './src/confirm-box.vue'

import { install } from '../../utils'

export const FzConfirmBox = install(ConfirmBox)

export type ConfirmBoxInstance = InstanceType<typeof ConfirmBox>

export * from './src/interface'

export default FzConfirmBox
