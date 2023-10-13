import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Slider from '../index'

describe('Slider', () => {
  test('class', () => {
    const wrapper = mount(Slider)
    expect(wrapper.classes()).toContain('fz-slider')
  })
})
