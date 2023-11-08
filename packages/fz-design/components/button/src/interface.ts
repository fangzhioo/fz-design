import type { ComponentSize } from '../../../types'

export type { ButtonProps } from './props'

/**
 * 原生 type 属性
 *
 * @see type https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/button#attr-type
 */
export type ButtonNative = 'submit' | 'reset' | 'button'

export type ButtonType =
  | 'default'
  | 'primary'
  | 'success'
  | 'warning'
  | 'info'
  | 'error'
  | 'text'
  | ''

export type ButtonSize = ComponentSize
