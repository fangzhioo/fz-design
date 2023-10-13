import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Tree from '../index'

describe('Tree', () => {
  test('class', () => {
    const wrapper = mount(Tree)
    expect(wrapper.classes()).toContain('fz-tree')
  })
})
