import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import FzMessageVue from '../src/message.vue'

describe('FzMessage', () => {
  test('base', async () => {
    const wrapper = mount(FzMessageVue, {
      props: {
        message: '这是一段内容',
        type: 'success'
      }
    })
    expect(wrapper.find('.fz-message').exists()).toBe(true)
    expect(wrapper.find('.fz-message--success').exists()).toBe(true)
    await wrapper.setProps({ type: 'primary' })
    expect(wrapper.find('.fz-message--primary').exists()).toBe(true)
    await wrapper.setProps({ closable: true })
    expect(wrapper.find('.fz-message__close').exists()).toBe(true)
  })
})
