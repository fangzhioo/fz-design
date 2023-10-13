import SvgIcon from './src/svg-icon.vue'

import { install } from '../../utils'

export const FzSvgIcon = install(SvgIcon)

export type SvgIconInstance = InstanceType<typeof SvgIcon>

export * from './src/interface'

export default FzSvgIcon
