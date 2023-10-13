import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Dropdown from '../index'

describe('Dropdown', () => {
  test('class', () => {
    const wrapper = mount(Dropdown)
    expect(wrapper.classes()).toContain('fz-dropdown')
  })
})
