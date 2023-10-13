import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import ConfigProvider from '../index'

describe('ConfigProvider', () => {
  test('class', () => {
    const wrapper = mount(ConfigProvider)
    expect(wrapper.classes()).toContain('fz-config-provider')
  })
})
