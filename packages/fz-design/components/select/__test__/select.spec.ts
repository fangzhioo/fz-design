import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Select from '../index'

describe('Select', () => {
  test('class', () => {
    const wrapper = mount(Select)
    expect(wrapper.classes()).toContain('fz-select')
  })
})
