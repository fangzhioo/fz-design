import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Swap from '../index'

describe('Swap', () => {
  test('class', () => {
    const wrapper = mount(Swap)
    expect(wrapper.classes()).toContain('fz-swap')
  })
})
