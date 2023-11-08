export type { TooltipProps } from './props'
import type { InjectionKey, Ref } from 'vue'
import type { TooltipTriggerType } from './components/trigger'
import type { Arrayable } from '../../../types'

export interface FzTooltipInjectionContext {
  controlled: Ref<boolean>
  id: Ref<string>
  open: Ref<boolean>
  trigger: Ref<Arrayable<TooltipTriggerType>>
  onOpen: (e?: Event) => void
  onClose: (e?: Event) => void
  onToggle: (e: Event) => void
  onShow: () => void
  onHide: () => void
  onBeforeShow: () => void
  onBeforeHide: () => void
  updatePopper: () => void
}

export const TOOLTIP_INJECTION_KEY: InjectionKey<FzTooltipInjectionContext> =
  Symbol('fzTooltip')
