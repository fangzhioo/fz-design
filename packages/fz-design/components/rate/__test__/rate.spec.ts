import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Rate from '../index'

describe('Rate', () => {
  test('class', () => {
    const wrapper = mount(Rate)
    expect(wrapper.classes()).toContain('fz-rate')
  })
})
