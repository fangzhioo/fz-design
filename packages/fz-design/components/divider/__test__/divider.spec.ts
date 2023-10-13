import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Divider from '../index'

describe('Divider', () => {
  test('class', () => {
    const wrapper = mount(Divider)
    expect(wrapper.classes()).toContain('fz-divider')
  })
})
