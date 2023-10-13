import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import CollapseTransition from '../index'

describe('CollapseTransition', () => {
  test('class', () => {
    const wrapper = mount(CollapseTransition)
    expect(wrapper.classes()).toContain('fz-collapse-transition')
  })
})
