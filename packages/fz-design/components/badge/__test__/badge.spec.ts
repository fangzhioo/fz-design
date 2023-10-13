import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Badge from '../index'

describe('Badge', () => {
  test('class', () => {
    const wrapper = mount(Badge)
    expect(wrapper.classes()).toContain('fz-badge')
  })
})
