import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Switch from '../index'

describe('Switch', () => {
  test('class', () => {
    const wrapper = mount(Switch)
    expect(wrapper.classes()).toContain('fz-switch')
  })
})
