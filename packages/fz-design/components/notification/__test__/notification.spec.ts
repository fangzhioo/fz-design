import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Notification from '../index'

describe('Notification', () => {
  test('class', () => {
    const wrapper = mount(Notification)
    expect(wrapper.classes()).toContain('fz-notification')
  })
})
