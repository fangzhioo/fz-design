import type { ExtractPropTypes } from 'vue'
import { createModelToggleComposable } from '../../../hooks'
import { Props as popperProps } from '../../popper/src/props'
import { useTooltipContentProps } from './components/content'
import { useTooltipTriggerProps } from './components/trigger'
import { popperArrowProps } from '../../popper/src/components/arrow'

export const {
  useModelToggleProps: useTooltipModelToggleProps,
  useModelToggleEmits: useTooltipModelToggleEmits,
  useModelToggle: useTooltipModelToggle
} = createModelToggleComposable('visible' as const)

export const Props = {
  ...popperProps,
  ...useTooltipModelToggleProps,
  ...useTooltipContentProps,
  ...useTooltipTriggerProps,
  ...popperArrowProps,
  /**
   * @description whether the tooltip content has an arrow
   */
  showArrow: {
    type: Boolean,
    default: true
  }
} as const

export const Emits = [
  ...useTooltipModelToggleEmits,
  'before-show',
  'before-hide',
  'show',
  'hide',
  'open',
  'close'
]

export type TooltipProps = ExtractPropTypes<typeof Props>
