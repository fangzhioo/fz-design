import { isRef, ref, Ref } from 'vue';
import { hyphenate, isObject, isString } from '@vue/shared';
import { Loading } from './service';
import { keysOf } from '@fzui/utils';
import { FZ_LOADING_INSTANCE_INJECT_KEY } from '@fzui/constants';

import type { Directive, DirectiveBinding, UnwrapRef } from 'vue';
import type { LoadingOptions } from './Loading';
import type { LoadingInstance } from './create-loading';

export type LoadingBinding = boolean | UnwrapRef<LoadingOptions>;
export interface ElementLoading extends HTMLElement {
  [FZ_LOADING_INSTANCE_INJECT_KEY]?: {
    instance: LoadingInstance;
    options: LoadingOptions;
  };
}

const createInstance = (el: ElementLoading, binding: DirectiveBinding<LoadingBinding>) => {
  const vm = binding.instance;

  const getBindingProp = <K extends keyof LoadingOptions>(key: K): LoadingOptions[K] => (isObject(binding.value) ? binding.value[key] : undefined);

  const resolveExpression = (key: any) => {
    const data = (isString(key) && (vm as any)?.[key]) || key;
    if (data) return ref(data);
    else return data;
  };

  const getProp = <K extends keyof LoadingOptions>(name: K) => resolveExpression(getBindingProp(name) || el.getAttribute(`element-loading-${hyphenate(name)}`));

  const fullscreen = getBindingProp('fullscreen') ?? binding.modifiers.fullscreen;

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
    lock: getBindingProp('lock') ?? binding.modifiers.lock,
  };
  el[FZ_LOADING_INSTANCE_INJECT_KEY] = {
    options,
    instance: Loading(options),
  };
};

const updateOptions = (newOptions: UnwrapRef<LoadingOptions>, originalOptions: LoadingOptions) => {
  for (const key of keysOf(originalOptions)) {
    if (isRef(originalOptions[key])) (originalOptions[key] as Ref<any>).value = newOptions[key];
  }
};

export const vLoading: Directive<ElementLoading, LoadingBinding> = {
  mounted(el, binding) {
    if (binding.value) {
      createInstance(el, binding);
    }
  },
  updated(el, binding) {
    const instance = el[FZ_LOADING_INSTANCE_INJECT_KEY];
    if (binding.oldValue !== binding.value) {
      if (binding.value && !binding.oldValue) {
        createInstance(el, binding);
      } else if (binding.value && binding.oldValue) {
        if (isObject(binding.value)) updateOptions(binding.value, instance!.options);
      } else {
        instance?.instance.close();
      }
    }
  },
  unmounted(el) {
    el[FZ_LOADING_INSTANCE_INJECT_KEY]?.instance.close();
  },
};
