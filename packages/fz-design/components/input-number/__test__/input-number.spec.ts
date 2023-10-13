import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import InputNumber from '../index'

describe('InputNumber', () => {
  test('class', () => {
    const wrapper = mount(InputNumber)
    expect(wrapper.classes()).toContain('fz-input-number')
  })
})
