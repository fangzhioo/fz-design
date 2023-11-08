import { computed, getCurrentInstance, inject, unref } from 'vue'
import { useNamespace } from './use-namespace'

import type { InjectionKey, Ref } from 'vue'
import { isClient, warning } from '../utils'
import type { MaybeRef } from '../types'

export interface FzIdInjectionContext {
  prefix: number
  current: number
}

const defaultIdInjection = {
  prefix: Math.floor(Math.random() * 10000),
  current: 0
}

export const ID_INJECTION_KEY: InjectionKey<FzIdInjectionContext> =
  Symbol('fzIdInjection')

export const useIdInjection = (): FzIdInjectionContext => {
  return getCurrentInstance()
    ? inject(ID_INJECTION_KEY, defaultIdInjection)
    : defaultIdInjection
}

export const useId = (deterministicId?: MaybeRef<string>): Ref<string> => {
  const idInjection = useIdInjection()
  if (!isClient && idInjection === defaultIdInjection) {
    warning(
      'IdInjection',
      `Looks like you are using server rendering, you must provide a id provider to ensure the hydration process to be succeed
usage: app.provide(ID_INJECTION_KEY, {
  prefix: number,
  current: number,
})`
    )
  }

  const ns = useNamespace('id');

  const idRef = computed(
    () =>
      unref(deterministicId) ||
      `${ns.b()}-${idInjection.prefix}-${idInjection.current++}`
  )

  return idRef as any
}
