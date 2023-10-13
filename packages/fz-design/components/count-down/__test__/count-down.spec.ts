import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import CountDown from '../index'

describe('CountDown', () => {
  test('class', () => {
    const wrapper = mount(CountDown)
    expect(wrapper.classes()).toContain('fz-count-down')
  })
})
