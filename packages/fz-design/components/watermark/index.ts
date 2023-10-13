import Watermark from './src/watermark.vue'

import { install } from '../../utils'

export const FzWatermark = install(Watermark)

export type WatermarkInstance = InstanceType<typeof Watermark>

export * from './src/interface'

export default FzWatermark
