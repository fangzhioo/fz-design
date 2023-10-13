import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Layout from '../index'

describe('Layout', () => {
  test('class', () => {
    const wrapper = mount(Layout)
    expect(wrapper.classes()).toContain('fz-layout')
  })
})
