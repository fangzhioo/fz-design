import type { ExtractPropTypes, PropType, StyleValue } from 'vue'
import type { TextareaAutoSize, TextareaResize } from './interface'

export const Props = {
  /** 绑定值 */
  modelValue: {
    type: [Number, String] as PropType<string | number>,
    default: ''
  },
  /**
   * control the resizability
   */
  resize: {
    type: String as PropType<TextareaResize>
  },
  /**
   * native input autocomplete
   */
  autocomplete: {
    type: String,
    default: 'off'
  },
  /**
   * 最大输入长度
   *
   * @see maxlength https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#attr-maxlength
   */
  maxlength: {
    type: Number
  },
  /**
   *  placeholder
   */
  placeholder: {
    type: String
  },
  /**
   *  native input readonly
   */
  /**
   *  whether to disable
   */
  disabled: Boolean,
  readonly: {
    type: Boolean,
    default: false
  },
  textareaStyle: {
    type: Object as PropType<StyleValue>,
    default: () => ({} as StyleValue)
  },
  /**
   *  input tabindex
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
   *  native input aria-label
   */
  label: {
    type: String,
    default: undefined
  },
  /**
   *  format content
   */
  formatter: {
    type: Function
  },
  /**
   *  parse content
   */
  parser: {
    type: Function
  },
  /**
   *  native input autofocus
   */
  autofocus: {
    type: Boolean,
    default: false
  },
  autosize: {
    type: [Boolean, Object] as PropType<TextareaAutoSize>,
    default: false
  }
} as const

export type TextareaProps = ExtractPropTypes<typeof Props>
