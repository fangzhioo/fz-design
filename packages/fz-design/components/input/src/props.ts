/* eslint-disable @typescript-eslint/explicit-function-return-type */
import type { ExtractPropTypes, PropType, StyleValue } from 'vue'
import type { IconSlotType } from '../../../types'
import type { InputSize, InputType } from './interface'
import { BLUR_EVENT, CHANGE_EVENT, FOCUS_EVENT, INPUT_EVENT, UPDATE_MODEL_EVENT } from '../../../constants'
import { isString } from '../../../utils'

export const Props = {
  /**
   * @description native input id
   */
  id: {
    type: String,
    default: undefined
  },
  /**
   * @description input box size
   */
  size: {
    type: String as PropType<InputSize>,
    default: 'default'
  },
  /**
   * @description whether to disable
   */
  disabled: Boolean,
  /**
   * @description binding value
   */
  modelValue: {
    type: [
      String,
      Number,
      Object
    ] as PropType<string | number | null | undefined>,
    default: ''
  },
  /**
   * @description type of input
   */
  type: {
    type: String as PropType<InputType>,
    default: 'text'
  },
  /**
   * @description control the resizability
   */
  resize: {
    type: String as PropType<'none'|'both'| 'horizontal'| 'vertical'>
  },
  /**
   * @description native input autocomplete
   */
  autocomplete: {
    type: String,
    default: 'off'
  },
  /**
   * @description format content
   */
  formatter: {
    type: Function
  },
  /**
   * @description parse content
   */
  parser: {
    type: Function as PropType<Function>
  },
  /**
   * @description placeholder
   */
  placeholder: {
    type: String
  },
  /**
   * @description native input form
   */
  form: {
    type: String
  },
  /**
   * @description native input readonly
   */
  readonly: {
    type: Boolean,
    default: false
  },
  /**
   * @description native input readonly
   */
  clearable: {
    type: Boolean,
    default: false
  },
  /**
   * @description toggleable password input
   */
  showPassword: {
    type: Boolean,
    default: false
  },
  /**
   * @description word count
   */
  showWordLimit: {
    type: Boolean,
    default: false
  },
  /**
   * @description suffix icon
   */
  suffixIcon: {
    type: Object as PropType<IconSlotType>
  },
  /**
   * @description prefix icon
   */
  prefixIcon: {
    type: Object as PropType<IconSlotType>
  },
  /**
   * @description container role, internal properties provided for use by the picker component
   */
  containerRole: {
    type: String,
    default: undefined
  },
  /**
   * @description native input aria-label
   */
  label: {
    type: String,
    default: undefined
  },
  /**
   * @description input tabindex
   */
  tabindex: {
    type: [String, Number] as PropType<string | number>,
    default: 0
  },
  /**
   * @description whether to trigger form validation
   */
  validateEvent: {
    type: Boolean,
    default: true
  },
  /**
   * @description input or textarea element style
   */
  inputStyle: {
    type: [Object, Array, String] as PropType<StyleValue>,
    default: () => ({} as const)
  },
  /**
   * @description native input autofocus
   */
  autofocus: {
    type: Boolean,
    default: false
  }
} as const

export const Emits = {
  [UPDATE_MODEL_EVENT]: (value: string) => isString(value),
  [INPUT_EVENT]: (value: string) => isString(value),
  [CHANGE_EVENT]: (value: string) => isString(value),
  [FOCUS_EVENT]: (evt: FocusEvent) => evt instanceof FocusEvent,
  [BLUR_EVENT]: (evt: FocusEvent) => evt instanceof FocusEvent,
  clear: () => true,
  mouseleave: (evt: MouseEvent) => evt instanceof MouseEvent,
  mouseenter: (evt: MouseEvent) => evt instanceof MouseEvent,
  // NOTE: when autofill by browser, the keydown event is instanceof Event, not KeyboardEvent
  // relative bug report https://github.com/element-plus/element-plus/issues/6665
  keydown: (evt: KeyboardEvent | Event) => evt instanceof Event,
  compositionstart: (evt: CompositionEvent) => evt instanceof CompositionEvent,
  compositionupdate: (evt: CompositionEvent) => evt instanceof CompositionEvent,
  compositionend: (evt: CompositionEvent) => evt instanceof CompositionEvent
}

export type InputEmits = typeof Emits

export type InputProps = ExtractPropTypes<typeof Props>
