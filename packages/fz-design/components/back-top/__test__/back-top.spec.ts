import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import BackTop from '../index'

describe('BackTop', () => {
  test('class', () => {
    const wrapper = mount(BackTop)
    expect(wrapper.classes()).toContain('fz-back-top')
  })
})
