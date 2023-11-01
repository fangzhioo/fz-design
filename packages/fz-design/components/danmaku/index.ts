import Danmaku from './src/danmaku.vue'

import { install } from '../../utils'

export const FzDanmaku = install(Danmaku)

export type DanmakuInstance = InstanceType<typeof Danmaku>

export * from './src/interface'

export default FzDanmaku
