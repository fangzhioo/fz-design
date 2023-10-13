import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Textarea from '../index'

describe('Textarea', () => {
  test('class', () => {
    const wrapper = mount(Textarea)
    expect(wrapper.classes()).toContain('fz-textarea')
  })
})
