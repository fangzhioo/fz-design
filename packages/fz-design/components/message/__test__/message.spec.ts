import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Message from '../index'

describe('Message', () => {
  test('class', () => {
    const wrapper = mount(Message)
    expect(wrapper.classes()).toContain('fz-message')
  })
})
