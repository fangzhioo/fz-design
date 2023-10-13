import Card from './src/card.vue'

import { install } from '../../utils'

export const FzCard = install(Card)

export type CardInstance = InstanceType<typeof Card>

export * from './src/interface'

export default FzCard
