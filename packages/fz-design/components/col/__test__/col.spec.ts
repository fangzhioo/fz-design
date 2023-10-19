import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Col from '../index'

describe('Col', () => {
  test('class', () => {
    const wrapper = mount(Col)
    expect(wrapper.classes()).toContain('fz-col')
  })
})
