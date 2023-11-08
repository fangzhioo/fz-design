import type { Ref} from 'vue';
import { computed, onBeforeMount } from 'vue'
import { useNamespace } from './use-namespace'
import { useIdInjection } from './use-id'
import { isClient } from '../utils';

let cachedContainer: HTMLElement

export const usePopperContainerId = (): { id: Ref<string>; selector: Ref<string> } => {
  const ns = useNamespace('popper')
  const idInjection = useIdInjection()

  const id = computed(() => {
    return `${ns.b()}-container-${idInjection.prefix}`
  })
  const selector = computed(() => `#${id.value}`)

  return {
    id,
    selector
  }
}

const createContainer = (id: string): HTMLElement => {
  const container = document.createElement('div')
  container.id = id
  document.body.appendChild(container)
  return container
}

export const usePopperContainer = (): { id: Ref<string>; selector: Ref<string> } => {
  const { id, selector } = usePopperContainerId()
  onBeforeMount(() => {
    if (!isClient) return

    // This is for bypassing the error that when under testing env, we often encounter
    // document.body.innerHTML = '' situation
    // for this we need to disable the caching since it's not really needed
    if (
      process.env.NODE_ENV === 'test' ||
      (!cachedContainer && !document.body.querySelector(selector.value))
    ) {
      cachedContainer = createContainer(id.value)
    }
  })

  return {
    id,
    selector
  }
}
