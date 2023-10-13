import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Input from '../index'

describe('Input', () => {
  test('class', () => {
    const wrapper = mount(Input)
    expect(wrapper.classes()).toContain('fz-input')
  })
})
