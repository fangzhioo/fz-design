import { mount } from '@vue/test-utils'
import { describe, expect, afterEach, it } from 'vitest'
import Tooltip from '../index'
import PopperTrigger from '../../popper/src/components/trigger.vue'

import type { TooltipInstance } from '../index'
import type { VueWrapper } from '@vue/test-utils'
import { nextTick, type VNode } from 'vue'

const AXIOM = 'I am Kirito'

// const rAF = async (): Promise<void> => {
//   return new Promise(res => {
//     requestAnimationFrame(() => {
//       requestAnimationFrame(async () => {
//         res()
//         await nextTick()
//       })
//     })
//   })
// }

describe('Tooltip', () => {
  const createComponent = (
    props = {},
    content: string | VNode = ''
  ): VueWrapper<TooltipInstance> =>
    mount(Tooltip, {
      props,
      slots: { default: () => AXIOM, content: () => content },
      attachTo: document.body
    })

  let wrapper: ReturnType<typeof createComponent>
  const findTrigger = (): ReturnType<typeof createComponent> =>
    wrapper.findComponent(PopperTrigger as any)

  afterEach(() => {
    wrapper?.unmount()
    document.body.innerHTML = ''
  })

  describe('rendering', () => {
    it('should render correctly', async () => {
      wrapper = createComponent()
      await nextTick()
      expect(findTrigger().text()).toContain(AXIOM)
    })
    it('content should teleport according appendTo', async () => {
      const el = document.createElement('div')
      el.id = 'test'
      document.body.appendChild(el)
      wrapper = createComponent({ appendTo: '#test' }, 'test appendTo props')
      await nextTick()
      const trigger$ = findTrigger()
      const triggerEl = trigger$.find('.fz-tooltip__trigger')
      await triggerEl.trigger('mouseenter')
      expect(document.querySelector('#test')?.innerHTML).toContain('test appendTo props')
    })
  })

  describe('functionality', () => {
    it('should be able to update popper content manually', async () => {
      wrapper = createComponent()
      await nextTick()

      const { vm } = wrapper
      expect(vm.updatePopper).toBeDefined()
      vm.updatePopper()
    })

  })
})
