import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import ColorPicker from '../index'

describe('ColorPicker', () => {
  test('class', () => {
    const wrapper = mount(ColorPicker)
    expect(wrapper.classes()).toContain('fz-color-picker')
  })
})
