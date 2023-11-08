import type { PropType } from 'vue'
import type { Measurable } from '../utils/constants'
import type Trigger from './trigger.vue'

export const popperTriggerProps = {
  virtualRef: {
    type: Object as PropType<Measurable>
  },
  virtualTriggering: Boolean,
  onMouseenter: {
    type: Function as PropType<(e: Event) => void>
  },
  onMouseleave: {
    type: Function as PropType<(e: Event) => void>
  },
  onClick: {
    type: Function as PropType<(e: Event) => void>
  },
  onKeydown: {
    type: Function as PropType<(e: Event) => void>
  },
  onFocus: {
    type: Function as PropType<(e: Event) => void>
  },
  onBlur: {
    type: Function as PropType<(e: Event) => void>
  },
  onContextmenu: {
    type: Function as PropType<(e: Event) => void>
  },
  id: String,
  open: Boolean
} as const

export type PopperTriggerProps = typeof popperTriggerProps

export type PopperTriggerInstance = InstanceType<typeof Trigger>
