import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Text from '../index'

describe('Text', () => {
  test('class', () => {
    const wrapper = mount(Text)
    expect(wrapper.classes()).toContain('fz-text')
  })
})
