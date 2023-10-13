import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Scrollbar from '../index'

describe('Scrollbar', () => {
  test('class', () => {
    const wrapper = mount(Scrollbar)
    expect(wrapper.classes()).toContain('fz-scrollbar')
  })
})
