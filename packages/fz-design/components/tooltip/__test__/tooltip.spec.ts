import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Tooltip from '../index'

describe('Tooltip', () => {
  test('class', () => {
    const wrapper = mount(Tooltip)
    expect(wrapper.classes()).toContain('fz-tooltip')
  })
})
