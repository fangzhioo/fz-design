import { isRef, ref } from 'vue'
import { Loading } from './service'
import type { Directive, DirectiveBinding, Ref, UnwrapRef } from 'vue'
import type { LoadingOptions } from './interface'
import type { LoadingInstance } from './loading'
import { isObject, isString } from '../../../utils'

const INSTANCE_KEY = Symbol('FzLoading')

const hyphenate = (str: string): string => str.replace( /\B([A-Z])/g, '-$1').toLowerCase()

export type LoadingBinding = boolean | UnwrapRef<LoadingOptions>
export interface ElementLoading extends HTMLElement {
  [INSTANCE_KEY]?: {
    instance: LoadingInstance
    options: LoadingOptions
  }
}

const createInstance = (
  el: ElementLoading,
  binding: DirectiveBinding<LoadingBinding>
): void => {
  const vm = binding.instance

  const getBindingProp = <K extends keyof LoadingOptions>(
    key: K
  ): LoadingOptions[K] =>
    isObject(binding.value) ? binding.value[key] : undefined

  const resolveExpression = (key: any): any => {
    const data = (isString(key) && (vm as any)?.[key]) || key
    if (data) return ref(data)
    else return data
  }

  const getProp = <K extends keyof LoadingOptions>(name: K): UnwrapRef<LoadingOptions[K]> =>
    resolveExpression(
      getBindingProp(name) ||
        el.getAttribute(`element-loading-${hyphenate(name)}`)
    )

  const fullscreen =
    getBindingProp('fullscreen') ?? binding.modifiers.fullscreen

  const options: LoadingOptions = {
    text: getProp('text'),
    svg: getProp('svg'),
    svgViewBox: getProp('svgViewBox'),
    spinner: getProp('spinner'),
    background: getProp('background'),
    customClass: getProp('customClass'),
    fullscreen,
    target: getBindingProp('target') ?? (fullscreen ? undefined : el),
    body: getBindingProp('body') ?? binding.modifiers.body,
    lock: getBindingProp('lock') ?? binding.modifiers.lock
  }
  el[INSTANCE_KEY] = {
    options,
    instance: Loading(options)
  }
}

const updateOptions = (
  newOptions: UnwrapRef<LoadingOptions>,
  originalOptions: LoadingOptions
): void => {
  for (const key of Object.keys(originalOptions)) {
    const op = originalOptions[key as keyof LoadingOptions] as Ref<any>
    if (isRef(op)) op.value = newOptions[key as keyof LoadingOptions];
  }
}

export const vLoading: Directive<ElementLoading, LoadingBinding> = {
  mounted (el, binding) {
    if (binding.value) {
      createInstance(el, binding)
    }
  },
  updated (el, binding) {
    const instance = el[INSTANCE_KEY]
    if (binding.oldValue !== binding.value) {
      if (binding.value && !binding.oldValue) {
        createInstance(el, binding)
      } else if (binding.value && binding.oldValue) {
        if (isObject(binding.value))
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          updateOptions(binding.value, instance!.options)
      } else {
        instance?.instance.close()
      }
    }
  },
  unmounted (el) {
    el[INSTANCE_KEY]?.instance.close()
  }
}
