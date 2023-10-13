import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Empty from '../index'

describe('Empty', () => {
  test('class', () => {
    const wrapper = mount(Empty)
    expect(wrapper.classes()).toContain('fz-empty')
  })
})
