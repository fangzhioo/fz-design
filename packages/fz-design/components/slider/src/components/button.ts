import { isNumber } from '../../../../utils'
import { UPDATE_MODEL_EVENT } from '../../../../constants'
import type { ExtractPropTypes, PropType, Ref } from 'vue'
import type Button from './button.vue'
import type { PopperPlacement } from '../../../../hooks/use-popper'

export const sliderButtonProps = {
  modelValue: {
    type: Number,
    default: 0
  },
  vertical: Boolean,
  tooltipClass: String,
  placement: {
    type: String as PropType<PopperPlacement>,
    default: 'top'
  }
} as const
export type SliderButtonProps = ExtractPropTypes<typeof sliderButtonProps>

export const sliderButtonEmits = {
  [UPDATE_MODEL_EVENT]: (value: number): boolean => isNumber(value)
}
export type SliderButtonEmits = typeof sliderButtonEmits

export type SliderButtonInstance = InstanceType<typeof Button>

export type ButtonRefs = Record<
  'firstButton' | 'secondButton',
  Ref<SliderButtonInstance | undefined>
>

export interface SliderButtonInitData {
  hovering: boolean
  dragging: boolean
  isClick: boolean
  startX: number
  currentX: number
  startY: number
  currentY: number
  startPosition: number
  newPosition: number
  oldValue: number
}
