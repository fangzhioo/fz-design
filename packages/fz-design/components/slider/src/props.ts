import type { ExtractPropTypes, PropType } from 'vue'
import type { Arrayable } from '../../../types'
import type { PopperPlacement } from '../../../hooks/use-popper'
import type { SliderMarks } from './interface'
import { isNumber, isArray } from '../../../utils'
import { UPDATE_MODEL_EVENT, INPUT_EVENT, CHANGE_EVENT } from '../../../constants'

export const Props = {
  modelValue: {
    type: [Number, Array] as PropType<Arrayable<number>>,
    default: 0
  },
  id: {
    type: String,
    default: undefined
  },
  min: {
    type: Number,
    default: 0
  },
  max: {
    type: Number,
    default: 100
  },
  step: {
    type: Number,
    default: 1
  },
  showInput: Boolean,
  showInputControls: {
    type: Boolean,
    default: true
  },
  size: {
    type: String
  },
  inputSize: {
    type: String
  },
  showStops: Boolean,
  showTooltip: {
    type: Boolean,
    default: true
  },
  formatTooltip: {
    type: Function as PropType<(val: number) => number | string>,
    default: undefined
  },
  disabled: Boolean,
  range: Boolean,
  vertical: Boolean,
  height: String,
  debounce: {
    type: Number,
    default: 300
  },
  label: {
    type: String,
    default: undefined
  },
  rangeStartLabel: {
    type: String,
    default: undefined
  },
  rangeEndLabel: {
    type: String,
    default: undefined
  },
  formatValueText: {
    type: Function as PropType<(val: number) => string>,
    default: undefined
  },
  tooltipClass: {
    type: String,
    default: undefined
  },
  placement: {
    type: String as PropType<PopperPlacement>,
    default: 'top'
  },
  marks: {
    type: Object as PropType<SliderMarks>
  },
  validateEvent: {
    type: Boolean,
    default: true
  }
} as const

const isValidValue = (value: Arrayable<number>): boolean =>
  isNumber(value) || (isArray(value) && value.every(isNumber))

export const Emits = {
  [UPDATE_MODEL_EVENT]: isValidValue,
  [INPUT_EVENT]: isValidValue,
  [CHANGE_EVENT]: isValidValue
}
export type SliderEmits = typeof Emits

export type SliderProps = ExtractPropTypes<typeof Props>
