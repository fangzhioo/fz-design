import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Drawer from '../index'

describe('Drawer', () => {
  test('class', () => {
    const wrapper = mount(Drawer)
    expect(wrapper.classes()).toContain('fz-drawer')
  })
})
