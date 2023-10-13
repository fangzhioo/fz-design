import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Tag from '../index'

describe('Tag', () => {
  test('class', () => {
    const wrapper = mount(Tag)
    expect(wrapper.classes()).toContain('fz-tag')
  })
})
