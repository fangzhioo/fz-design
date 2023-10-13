import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Swipe from '../index'

describe('Swipe', () => {
  test('class', () => {
    const wrapper = mount(Swipe)
    expect(wrapper.classes()).toContain('fz-swipe')
  })
})
