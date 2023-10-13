import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Checkbox from '../index'

describe('Checkbox', () => {
  test('class', () => {
    const wrapper = mount(Checkbox)
    expect(wrapper.classes()).toContain('fz-checkbox')
  })
})
