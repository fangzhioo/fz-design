import type { ExtractPropTypes, PropType } from 'vue'
import type { IconSlotType } from '../../../types'
import type { InputSize, InputType } from './interface'
import { BLUR_EVENT, CHANGE_EVENT, FOCUS_EVENT, INPUT_EVENT } from '../../../constants'
import { isString } from '../../../utils'

export const Props = {
  /** 绑定值 */
  modelValue: {
    type: [Number, String] as PropType<string | number>,
    default: ''
  },
  /**
   * 类型
   *
   * 文字输入框或者密码输入框
   *
   * @values text password number
   * @default text
   */
  type: {
    type: String as PropType<InputType>,
    default: 'text'
  },
  /**
   * 尺寸
   *
   * @values large default small
   */
  size: {
    type: String as PropType<InputSize>
  },
  /**
   * 是否禁用
   *
   * @see disabled https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#attr-disabled
   */
  disabled: {
    type: Boolean
  },
  /**
   * 是否只读
   *
   * @see readonly https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#attr-readonly
   */
  readonly: {
    type: Boolean
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
   * 是否自动获取焦点
   *
   * @see autofocus https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#attr-autofocus
   */
  autofocus: {
    type: Boolean
  },
  /**
   * 原生 name 属性
   *
   * @see name https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#attr-name
   */
  name: {
    type: String
  },
  /**
   * 占位符
   *
   * @see placeholder https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#attr-placeholder
   */
  placeholder: {
    type: String
  },
  /** 是否可清除 */
  clearable: {
    type: Boolean
  },

  /** 是否可搜索 */
  search: {
    type: Boolean
  },

  /** 是否显示查看密码的按钮 */
  showPassword: {
    type: Boolean
  },
  /** 后缀 icon */
  suffixIcon: {
    type: Object as PropType<IconSlotType>
  },
  /** 前缀 icon */
  prefixIcon: {
    type: Object as PropType<IconSlotType>
  },
  /**
   * 是否开启自动填充特性提示
   *
   * 注意这不是一个布尔属性！
   *
   * 详情配置可参考
   *
   * @see HTML属性autocomplete https://developer.mozilla.org/zh-CN/docs/Web/HTML/Attributes/autocomplete
   * @see autocomplete https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#autocomplete
   */
  autocomplete: {
    type: String,
    default: 'off'
  }
} as const

export const Emits = {
  [INPUT_EVENT]: (value: string | number): boolean => isString(value),
  [CHANGE_EVENT]: (value: string | number): boolean => isString(value),
  [FOCUS_EVENT]: (evt: FocusEvent): boolean => evt instanceof FocusEvent,
  [BLUR_EVENT]: (evt: FocusEvent): boolean => evt instanceof FocusEvent,
  search: (value: string | number, evt: MouseEvent | KeyboardEvent): boolean =>
    evt instanceof Event,
  clear: (): boolean => true
}

export type InputProps = ExtractPropTypes<typeof Props>
