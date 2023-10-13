import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import TimePicker from '../index'

describe('TimePicker', () => {
  test('class', () => {
    const wrapper = mount(TimePicker)
    expect(wrapper.classes()).toContain('fz-time-picker')
  })
})
