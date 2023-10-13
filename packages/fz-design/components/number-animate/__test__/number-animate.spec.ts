import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import NumberAnimate from '../index'

describe('NumberAnimate', () => {
  test('class', () => {
    const wrapper = mount(NumberAnimate)
    expect(wrapper.classes()).toContain('fz-number-animate')
  })
})
