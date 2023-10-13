import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import DatePicker from '../index'

describe('DatePicker', () => {
  test('class', () => {
    const wrapper = mount(DatePicker)
    expect(wrapper.classes()).toContain('fz-date-picker')
  })
})
