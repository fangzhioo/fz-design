import Barrage from './src/barrage.vue'

import { install } from '../../../fz-design/utils';

export const FzBarrage = install(Barrage)

export type BarrageInstance = InstanceType<typeof Barrage>

export * from './src/interface'

export default FzBarrage
