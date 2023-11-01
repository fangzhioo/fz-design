import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Danmaku from '../index'

describe('Danmaku', () => {
  test('class', () => {
    const wrapper = mount(Danmaku)
    expect(wrapper.classes()).toContain('fz-danmaku')
  })
})
