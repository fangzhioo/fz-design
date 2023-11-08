import type { CSSProperties, ComputedRef, Ref } from 'vue'
export type { PopperProps } from './props'

export * from './components/arrow';
export * from './components/content';
export * from './components/trigger';

const effects = ['light', 'dark'] as const
const triggers = ['click', 'contextmenu', 'hover', 'focus'] as const

export const Effect = {
  LIGHT: 'light',
  DARK: 'dark'
} as const

export const roleTypes = [
  'dialog',
  'grid',
  'group',
  'listbox',
  'menu',
  'navigation',
  'tooltip',
  'tree'
] as const

export interface Measurable {
  getBoundingClientRect: () => DOMRect
}

/**
 * triggerRef indicates the element that triggers popper
 * contentRef indicates the element of popper content
 * referenceRef indicates the element that popper content relative with
 */
export interface FzPopperInjectionContext {
  triggerRef: Ref<Measurable | undefined>
  contentRef: Ref<HTMLElement | undefined>
  popperInstanceRef: Ref<any | undefined>
  referenceRef: Ref<Measurable | undefined>
  role: ComputedRef<string>
}

export interface FzPopperContentInjectionContext {
  arrowRef: Ref<HTMLElement | undefined>
  arrowOffset: Ref<number | undefined>
  arrowStyle: ComputedRef<CSSProperties>
}

export type PopperEffect = typeof effects[number]
export type PopperTrigger = typeof triggers[number]
export type RoleTypes = typeof roleTypes[number]
