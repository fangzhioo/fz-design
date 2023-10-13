import Button from './src/button.vue'

import { install } from '../../utils'

export const FzButton = install(Button)

/** button 组件实例类型 */
export type ButtonInstance = InstanceType<typeof Button>

export * from './src/interface'

export default FzButton
