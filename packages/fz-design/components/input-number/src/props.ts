import type { ExtractPropTypes, PropType } from 'vue'
import type { InputNumberSize } from './interface'
import {
  BLUR_EVENT,
  CHANGE_EVENT,
  FOCUS_EVENT,
  INPUT_EVENT,
  UPDATE_MODEL_EVENT
} from '../../../constants'
import { isNumber, isNil } from '../../../utils'

export const Props = {
  /**
   * @description binding value
   */
  modelValue: Number,
  /**
   * @description same as `id` in native input
   */
  id: {
    type: String,
    default: undefined
  },
  /**
   * @description incremental step
   */
  step: {
    type: Number,
    default: 1
  },
  /**
   * @description whether input value can only be multiple of step
   */
  stepStrictly: Boolean,
  /**
   * @description the maximum allowed value
   */
  max: {
    type: Number,
    default: Number.POSITIVE_INFINITY
  },
  /**
   * @description the minimum allowed value
   */
  min: {
    type: Number,
    default: Number.NEGATIVE_INFINITY
  },

  /**
   * @description same as `readonly` in native input
   */
  readonly: Boolean,
  /**
   * @description whether the component is disabled
   */
  disabled: Boolean,
  /**
   * @description size of the component
   */
  size: {
    type: String as PropType<InputNumberSize>,
    default: 'default'
  },
  /**
   * @description whether to enable the control buttons
   */
  controls: {
    type: Boolean,
    default: true
  },
  /**
   * @description position of the control buttons
   */
  controlsPosition: {
    type: String as PropType<'' | 'right'>,
    default: ''
  },
  /**
   * @description value should be set when input box is cleared
   */
  valueOnClear: {
    type: [String, Number, null] as PropType<'min' | 'max' | number | null>,
    default: null
  },
  /**
   * @description same as `name` in native input
   */
  name: String,
  /**
   * @description same as `label` in native input
   */
  label: String,
  /**
   * @description same as `placeholder` in native input
   */
  placeholder: String,
  /**
   * @description precision of input value
   */
  precision: {
    type: Number
  },
  /**
   * @description whether to trigger form validation
   */
  validateEvent: {
    type: Boolean,
    default: true
  }
} as const

export const Emits = {
  [CHANGE_EVENT]: (cur: number | undefined, prev: number | undefined): boolean =>
    prev !== cur,
  [BLUR_EVENT]: (e: FocusEvent): boolean => e instanceof FocusEvent,
  [FOCUS_EVENT]: (e: FocusEvent): boolean => e instanceof FocusEvent,
  [INPUT_EVENT]: (val: number | null | undefined): boolean => isNumber(val) || isNil(val),
  [UPDATE_MODEL_EVENT]: (val: number | undefined): boolean => isNumber(val) || isNil(val)
}
export type InputNumberEmits = typeof Emits

export type InputNumberProps = ExtractPropTypes<typeof Props>
