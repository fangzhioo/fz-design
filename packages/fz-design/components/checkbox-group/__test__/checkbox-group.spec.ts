import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import CheckboxGroup from '../index'

describe('CheckboxGroup', () => {
  test('class', () => {
    const wrapper = mount(CheckboxGroup)
    expect(wrapper.classes()).toContain('fz-checkbox-group')
  })
})
