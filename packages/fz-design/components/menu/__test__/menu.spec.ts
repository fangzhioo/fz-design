import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Menu from '../index'

describe('Menu', () => {
  test('class', () => {
    const wrapper = mount(Menu)
    expect(wrapper.classes()).toContain('fz-menu')
  })
})
