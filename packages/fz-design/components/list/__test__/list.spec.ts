import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import List from '../index'

describe('List', () => {
  test('class', () => {
    const wrapper = mount(List)
    expect(wrapper.classes()).toContain('fz-list')
  })
})
