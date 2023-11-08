import { placements } from '@fz-design/fz-popperjs'

import type { ExtractPropTypes, PropType, StyleValue } from 'vue'
import type { Options, Placement } from '@fz-design/fz-popperjs'
import type { Measurable } from '../utils/constants'
import type Content from './content.vue'

type ClassObjectType = Record<string, boolean>
type ClassType = string | ClassObjectType | ClassType[]

const POSITIONING_STRATEGIES = ['fixed', 'absolute'] as const

export interface CreatePopperInstanceParams {
  referenceEl: Measurable
  popperContentEl: HTMLElement
  arrowEl: HTMLElement | undefined
}

export const popperCoreConfigProps = {
  boundariesPadding: {
    type: Number,
    default: 0
  },
  fallbackPlacements: {
    type: Array as PropType<Placement[]>,
    default: undefined
  },
  gpuAcceleration: {
    type: Boolean,
    default: true
  },
  /**
   * @description offset of the Tooltip
   */
  offset: {
    type: Number,
    default: 12
  },
  /**
   * @description position of Tooltip
   */
  placement: {
    type: String,
    values: placements,
    default: 'bottom'
  },
  /**
   * @description [popper.js](https://popper.js.org/docs/v2/) parameters
   */
  popperOptions: {
    type: Object as PropType<Partial<Options>>,
    default: () => ({})
  },
  strategy: {
    type: String,
    values: POSITIONING_STRATEGIES,
    default: 'absolute'
  }
} as const
export type PopperCoreConfigProps = ExtractPropTypes<typeof popperCoreConfigProps>

export const popperContentProps = {
  ...popperCoreConfigProps,
  id: String,
  style: {
    type: [String, Array, Object] as PropType<StyleValue>
  },
  className: {
    type: [String, Array, Object] as PropType<ClassType>
  },
  effect: {
    type: String,
    default: 'dark'
  },
  visible: Boolean,
  enterable: {
    type: Boolean,
    default: true
  },
  pure: Boolean,
  focusOnShow: {
    type: Boolean,
    default: false
  },
  trapping: {
    type: Boolean,
    default: false
  },
  popperClass: {
    type: [String, Array, Object] as PropType<ClassType>
  },
  popperStyle: {
    type: [String, Array, Object] as PropType<StyleValue>
  },
  referenceEl: {
    type: Object as PropType<HTMLElement>
  },
  triggerTargetEl: {
    type: Object as PropType<HTMLElement>
  },
  stopPopperMouseEvent: {
    type: Boolean,
    default: true
  },
  ariaLabel: {
    type: String,
    default: undefined
  },
  virtualTriggering: Boolean,
  zIndex: Number
} as const

export type PopperContentProps = ExtractPropTypes<typeof popperContentProps>

export const popperContentEmits = {
  mouseenter: (evt: MouseEvent): evt is MouseEvent => evt instanceof MouseEvent,
  mouseleave: (evt: MouseEvent): evt is MouseEvent => evt instanceof MouseEvent,
  focus: (): true => true,
  blur: (): true => true,
  close: (): true => true
}
export type PopperContentEmits = typeof popperContentEmits

export type PopperContentInstance = InstanceType<typeof Content>
