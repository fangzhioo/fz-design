import type { SliderMarkerProps } from './components/marker'
import type { Arrayable } from '../../../types'
import type { SliderProps } from './props'
import type { ComputedRef, Ref, ToRefs } from 'vue'

export type { SliderProps } from './props'

export type SliderMarks = Record<number, string | SliderMarkerProps['mark']>

export interface SliderInitData {
  firstValue: number
  secondValue: number
  oldValue?: Arrayable<number>
  dragging: boolean
  sliderSize: number
}

export interface SliderContext extends ToRefs<SliderProps> {
  precision: ComputedRef<number>
  sliderSize: Ref<number>
  emitChange: () => void
  resetSize: () => void
  updateDragging: (val: boolean) => void
}
