import type { ExtractPropTypes, PropType } from 'vue'
import { IconAlertCircle } from '@fz-design/fz-design-icon'

import type { ButtonType } from '../../button'
import type { IconSlotType } from '../../../types'
import { useTooltipContentProps } from '../../tooltip/src/components/content'

export const Props = {
  /**
   * @description Title
   */
  title: String,
  /**
   * @description Confirm button text
   */
  confirmButtonText: String,
  /**
   * @description Cancel button text
   */
  cancelButtonText: String,
  /**
   * @description Confirm button type
   */
  confirmButtonType: {
    type: String as PropType<ButtonType>,
    default: 'primary'
  },
  /**
   * @description Cancel button type
   */
  cancelButtonType: {
    type: String as PropType<ButtonType>,
    default: 'text'
  },
  /**
   * @description Icon Component
   */
  icon: {
    type: Object as PropType<IconSlotType>,
    default: () => IconAlertCircle
  },
  /**
   * @description Icon color
   */
  iconColor: {
    type: String,
    default: '#f90'
  },
  /**
   * @description is hide Icon
   */
  hideIcon: {
    type: Boolean,
    default: false
  },
  /**
   * @description delay of disappear, in millisecond
   */
  hideAfter: {
    type: Number,
    default: 200
  },
  /**
   * @description whether popconfirm is teleported to the body
   */
  teleported: useTooltipContentProps.teleported,
  /**
   * @description when popconfirm inactive and `persistent` is `false` , popconfirm will be destroyed
   */
  persistent: useTooltipContentProps.persistent,
  /**
   * @description popconfirm width, min width 150px
   */
  width: {
    type: [String, Number] as PropType<string | number>,
    default: 150
  }
} as const

export const Emits = {
  /**
   * @description triggers when click confirm button
   */
  confirm: (e: MouseEvent): boolean => e instanceof MouseEvent,
  /**
   * @description triggers when click cancel button
   */
  cancel: (e: MouseEvent): boolean => e instanceof MouseEvent
}

export type PopconfirmProps = ExtractPropTypes<typeof Props>
export type PopconfirmEmits = typeof Emits
