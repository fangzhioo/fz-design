import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Tabs from '../index'

describe('Tabs', () => {
  test('class', () => {
    const wrapper = mount(Tabs)
    expect(wrapper.classes()).toContain('fz-tabs')
  })
})
