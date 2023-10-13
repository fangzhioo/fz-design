import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import StickyCard from '../index'

describe('StickPanel', () => {
  test('class', () => {
    const wrapper = mount(StickyCard)
    expect(wrapper.classes()).toContain('fz-sticky-card')
  })
})
