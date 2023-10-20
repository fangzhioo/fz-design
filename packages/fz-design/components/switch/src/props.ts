import type { ExtractPropTypes, PropType } from 'vue'
import type { SwitchSize } from './interface'
import type { IconSlotType } from '../../../types'
import { CHANGE_EVENT, INPUT_EVENT, UPDATE_MODEL_EVENT } from '../../../constants'
import { isBoolean, isNumber, isString } from '../../../utils'

export const Props = {
  /**
   *  绑定值
   */
  modelValue: {
    type: [Boolean, String, Number] as PropType<boolean | string | number>,
    default: false
  },
  /**
   *  是否禁用
   */
  disabled: {
    type: Boolean,
    default: false
  },
  /**
   *  是否加载态
   */
  loading: {
    type: Boolean,
    default: false
  },
  /**
   *  尺寸
   */
  size: {
    type: String as PropType<SwitchSize>
  },
  /**
   *  宽度
   */
  width: {
    type: [String, Number] as PropType<string | number>,
    default: ''
  },
  /**
   *  无论图标或文本是否显示在点内，只会呈现文本的第一个字符
   */
  inlinePrompt: {
    type: Boolean,
    default: false
  },
  /**
   *  关闭时Icon
   */
  inactiveActionIcon: {
    type: Object as PropType<IconSlotType>
  },
  /**
   * 开启时Icon
   */
  activeActionIcon: {
    type: Object as PropType<IconSlotType>
  },
  /**
   * 开启时展示Icon，会覆盖`active-text`
   */
  activeIcon: {
    type: Object as PropType<IconSlotType>
  },
  /**
   * 关闭时展示Icon，会覆盖`inactive-text` 
   */
  inactiveIcon: {
    type: Object as PropType<IconSlotType>
  },
  /**
   *  开启时，展示文本
   */
  activeText: {
    type: String,
    default: ''
  },
  /**
   *  关闭时，展示文本
   */
  inactiveText: {
    type: String,
    default: ''
  },
  /**
   *  开启时的值
   */
  activeValue: {
    type: [Boolean, String, Number] as PropType<boolean | string | number>,
    default: true
  },
  /**
   *  关闭时的值
   */
  inactiveValue: {
    type: [Boolean, String, Number] as PropType<boolean | string | number>,
    default: false
  },
  /**
   *  原生input的name
   */
  name: {
    type: String,
    default: ''
  },
  /**
   *  是否触发form的校验事件
   */
  validateEvent: {
    type: Boolean,
    default: true
  },
  /**
   *  switch 状态改变前的钩子， 返回 false 或者返回 Promise 且被 reject 则停止切换
   */
  beforeChange: {
    type: Function as PropType<() => Promise<boolean> | boolean>
  },
  /**
   *  id for input
   */
  id: String,
  /**
   *  tabindex for input
   */
  tabindex: {
    type: [String, Number] as PropType<string | number>
  }
} as const

export const Emits = {
  [UPDATE_MODEL_EVENT]: (val: boolean | string | number): boolean =>
    isBoolean(val) || isString(val) || isNumber(val),
  [CHANGE_EVENT]: (val: boolean | string | number): boolean =>
    isBoolean(val) || isString(val) || isNumber(val),
  [INPUT_EVENT]: (val: boolean | string | number): boolean =>
    isBoolean(val) || isString(val) || isNumber(val)
}

export type SwitchProps = ExtractPropTypes<typeof Props>
