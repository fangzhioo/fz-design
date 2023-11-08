import Popper from './src/popper.vue'
import PopperArrow from './src/components/arrow.vue';
import PopperContent from './src/components/content.vue';
import PopperTrigger from './src/components/trigger.vue';
import { install } from '../../utils'

export const FzPopper = install(Popper)

export type PopperInstance = InstanceType<typeof Popper>

export * from './src/interface'

export * from './src/hooks'

export { Popper, PopperArrow, PopperContent, PopperTrigger }

export default FzPopper
